PikaVault

```

graph TD
    A[User] -->|1. Upload Card Details & Images| B[PokéVault Protocol]
    B -->|2. Verify Details| C[Oracle/TCGPlayer API]
    C -->|3. Return Current Price| B
    B -->|4. Mint NFT| D[Metaplex]
    D -->|5. NFT Minted| B
    B -->|6. List NFT| E[Marketplace]
    
    %% Buyer Flow
    F[Buyer] -->|7. Browse & Purchase| E
    E -->|8a. Transfer 80% SOL| G[Seller Wallet]
    E -->|8b. Lock 20% SOL| H[Escrow Contract]
    E -->|8c. Transfer NFT| F
    
    %% Redemption Flow
    F -->|9. Request Redemption| B
    B -->|10. Notify Seller| G
    G -->|11. Ship Card| F
    F -->|12. Confirm Receipt| B
    B -->|13a. Release Collateral| G
    B -->|13b. Burn NFT| D
```
