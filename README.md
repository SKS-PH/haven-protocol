# Haven

## Setup

To install all dependencies of onchain, offchain and frontend, run:

```shell
npm run deps
```

## Running local onchain

To run onchain locally, open a new terminal and run:

```shell
npm run onchain
```
This command shows contract addresses for local deployments of the HavenToken and HavenProtocol along with test accounts.
## Running local offchain
To run offchain locally, open a new terminal and run:
```shell
npm run offchain
```
## Running local frontend
To run frontend locally, open a new terminal and run:
```shell
npm run frontend
```

## Seeding onchain and offchain
To seed local onchain and offchain with test data make sure offchain and onchain is started then run:
```shell
npm run seed
```
## Moralis contract event indexing configuration
1. Create a local dev server on the moralis dashboard.
2. Make sure local onchain is running and run the following command with the values from the instance you created:
```shell
moralis-admin-cli add-contract --moralisApiKey FAM6pYzBKjcM 
--moralisApiSecret 7thQGNKKqX8s --abiPath "./deployments/localhost/HavenProtocol.json"
```
3. Select all events and enter the contract address HavenProtocol is deployed at locally when prompted.
4. Follow the instructions on the moralis server instance detail page to configure and run the devchain proxy server.

# Metamask configuration

## Adding local node to Metamask

Create a local hardhat network in metamask by doing the following:

1.  Navigate to Metamask Settings > Networks > Add Network.
2.  Label network name appropriately.
3.  In New RPC URL field paste rpc url from the previous step. It is usually `http://127.0.0.1:8545/`.
4.  For Chain ID, input `31337`. Metamask will return the correct one if that is wrong.
5.  Hit Save.

## Adding a local test account to Metamask

1.  Navigate to Metamask Menu->Import Account.
2.  Select a local account's private key and paste.
3.  Hit Import.
4.  _Optional:_ Label the account nickname appropriately to avoid confusion. e.g. Test Account #0
5.  Repeat for as many test accounts as you want.

> **Reminder:** Don't send real ETH to these accounts.

## Adding the Haven token to metamask
Running `npm run seed` pre-funds account #1 and #2 with 100 Haven tokens. Find the haven token contract address from the output of 
`npm run onchain` and Import token on Metamask.

# Brain dump
## What do we want _Haven_ to do?

1. Allow _Haven_ owners to post content.
2. Allow users to subscribe to _Haven_ owners.
3. Allow all users to stake for voting rights + rewards.
4. DAO - **$HAVEN** holders decide what happens to the protocol.

## What is a _Haven_?

A _haven_ is a space where content creators can interact with their fans in a much
more intimate way similar to Web2 services like Patreon, Onlyfans, Fansly, etc.

A _haven_ space improves upon these by eliminating platform risk and allowing
_haven owners_ have a customized and personalized feel to their space.

A _haven owner_ shouldn't feel like she is using a service or a brand like Patreon/Onlyfans.

## How to handle content access control?

Managing the encryption key for a _Haven's_ content is tricky. Decentralization is a spectrum.
On the far left, we can manage the haven encryption keys completely on a centralized server.
This is
disastrous as if the key is lost, _Haven_ owners are locked out of their own content.

For each _Haven_, we use two [DIDs](DID), specifically, two [3ID DIDs](3ID). One [DID](DID) is controlled by the _Haven_ owner,
the other by the _Haven Foundation_.

The owner controlled [3ID](3ID) is what will be used to
create an [IDX](idx) where we can store the associated encryption
key for her _Haven_ as a JWE. Per this [article](https://blog.ceramic.network/how-to-store-encrypted-secrets-using-idx/) we can add two [DIDs][did] to an [IDX][idx]. This is where the _Haven Foundation_
controlled [DID][did] comes in, and where some of the inevitable centralization happens.
Managing this [DID][did] should be
the same as keeping your metamask wallet safe. In the future we can perhaps explore multisig.

On the surface this just looks like the centralization solution with extra steps. But using this scheme,
the _Haven_ owner still controls her content, while we are able to decrypt and serve her content to her subscribers.

[did]: https://www.w3.org/TR/did-core
[3id]: https://developers.ceramic.network/authentication/3id-did/method/
[idx]: https://idx.xyz/
