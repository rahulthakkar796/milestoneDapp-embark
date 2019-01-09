module.exports = {
  // default applies to all environments
  default: {
    versions:{
      "web3.js":"0.20.7"
    },
    // Blockchain node to deploy the contracts
    deployment: {
      host: "localhost", // Host of the blockchain node
      port: 8555, // Port of the blockchain node
      type: "rpc" // Type of connection (ws or rpc),
      // Accounts to use instead of the default account to populate your wallet
      /*,accounts: [
        {
          privateKey: "your_private_key",
          balance: "5 ether"  // You can set the balance of the account in the dev environment
                              // Balances are in Wei, but you can specify the unit with its name
        },
        {
          privateKeyFile: "path/to/file", // Either a keystore or a list of keys, separated by , or ;
          password: "passwordForTheKeystore" // Needed to decrypt the keystore file
        },
        {
          mnemonic: "12 word mnemonic",
          addressIndex: "0", // Optionnal. The index to start getting the address
          numAddresses: "1", // Optionnal. The number of addresses to get
          hdpath: "m/44'/60'/0'/0/" // Optionnal. HD derivation path
        }
      ]*/
    },
    // order of connections the dapp should connect to
    dappConnection: [
      "$WEB3",  // uses pre existing web3 object if available (e.g in Mist)
      "ws://localhost:8555",
      "http://localhost:8545"
    ],
    gas: "auto",
    contracts: {
      // example:

      Escrow:{
        deploy:true,
        args:[]
      },
      Receive: {
       args: ["$Escrow"]
      },
      Vault:{
        args:["$Escrow"]
      },
      Milestone:{
        args:["$Escrow","$Vault","0xf09324e7a1e2821c2f7a4a47675f9cf0b1a5eb7f","0xf6d5c6d500cac10ee7e6efb5c1b479cfb789950a"]
      }
    }
  },

  // default environment, merges with the settings in default
  // assumed to be the intended environment by `embark run`
  development: {
    dappConnection: [
      // "ws://localhost:8555",
      // "http://localhost:8545",
      "$WEB3"  // uses pre existing web3 object if available (e.g in Mist)
    ]
  },

  // merges with the settings in default
  // used with "embark run privatenet"
  privatenet: {
  },

  // merges with the settings in default
  // used with "embark run testnet"
  testnet: {
  },

  // merges with the settings in default
  // used with "embark run livenet"
  livenet: {
  },

  // you can name an environment with specific settings and then specify with
  // "embark run custom_name" or "embark blockchain custom_name"
  //custom_name: {
  //}
};
