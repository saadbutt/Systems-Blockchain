package main

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"strconv"
)

const target = "000" // 3 leading zeroes

func findNonce(string string) (string, int) {
	var nonce int
	for {
		toHash := strconv.Itoa(nonce) + string
		hash := sha256.Sum256([]byte(toHash))
		hashHex := hex.EncodeToString(hash[:])
		if hashHex[:3] == target {
			return hashHex, nonce
		}
		nonce++
	}
}

func main() {
	string := "SYSTEMS-LIMITED-PAKISTAN"
	hash, nonce := findNonce(string)
	fmt.Println("Nonce:", nonce)
	fmt.Println("hash:", hash)
}
