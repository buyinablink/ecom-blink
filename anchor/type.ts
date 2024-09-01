/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/ecom_escrow.json`.
 */
export type EcomEscrow = {
  address: "9pJ1GXPbXQPUvzLJsz3HVSLqQ1rEyxauvZDL5e9aBRx8";
  metadata: {
    name: "ecomEscrow";
    version: "0.1.0";
    spec: "0.1.0";
    description: "Created with Anchor";
  };
  instructions: [
    {
      name: "cancelOrder";
      discriminator: [95, 129, 237, 240, 8, 49, 223, 132];
      accounts: [
        {
          name: "user";
          writable: true;
          signer: true;
        },
        {
          name: "order";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [111, 114, 100, 101, 114];
              },
              {
                kind: "account";
                path: "user";
              },
              {
                kind: "account";
                path: "order.order_id";
                account: "order";
              }
            ];
          };
        },
        {
          name: "orderVault";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [111, 114, 100, 101, 114, 86, 97, 117, 108, 116];
              },
              {
                kind: "account";
                path: "order";
              }
            ];
          };
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "orderId";
          type: "string";
        }
      ];
    },
    {
      name: "createOrder";
      discriminator: [141, 54, 37, 207, 237, 210, 250, 215];
      accounts: [
        {
          name: "user";
          writable: true;
          signer: true;
        },
        {
          name: "order";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [111, 114, 100, 101, 114];
              },
              {
                kind: "account";
                path: "user";
              },
              {
                kind: "arg";
                path: "orderId";
              }
            ];
          };
        },
        {
          name: "orderVault";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [111, 114, 100, 101, 114, 86, 97, 117, 108, 116];
              },
              {
                kind: "account";
                path: "order";
              }
            ];
          };
        },
        {
          name: "seller";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "orderId";
          type: "string";
        },
        {
          name: "amount";
          type: "u64";
        }
      ];
    },
    {
      name: "finalizeOrder";
      discriminator: [198, 89, 84, 237, 43, 9, 99, 55];
      accounts: [
        {
          name: "user";
          writable: true;
          signer: true;
        },
        {
          name: "reciever";
        },
        {
          name: "order";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [111, 114, 100, 101, 114];
              },
              {
                kind: "account";
                path: "reciever";
              },
              {
                kind: "account";
                path: "order.order_id";
                account: "order";
              }
            ];
          };
        },
        {
          name: "orderVault";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [111, 114, 100, 101, 114, 86, 97, 117, 108, 116];
              },
              {
                kind: "account";
                path: "order";
              }
            ];
          };
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "orderId";
          type: "string";
        }
      ];
    }
  ];
  accounts: [
    {
      name: "order";
      discriminator: [134, 173, 223, 185, 77, 86, 28, 51];
    }
  ];
  errors: [
    {
      code: 6000;
      name: "sellerNotAuthorized";
      msg: "Seller not authorized";
    },
    {
      code: 6001;
      name: "recieverNotAuthorized";
      msg: "Reciever not authorized";
    },
    {
      code: 6002;
      name: "orderIdMismatch";
      msg: "Order id mismatch";
    }
  ];
  types: [
    {
      name: "order";
      type: {
        kind: "struct";
        fields: [
          {
            name: "reciever";
            type: "pubkey";
          },
          {
            name: "amount";
            type: "u64";
          },
          {
            name: "orderId";
            docs: ["TBD BASED ON db_id"];
            type: "string";
          },
          {
            name: "seller";
            type: "pubkey";
          },
          {
            name: "bump";
            type: "u8";
          },
          {
            name: "vaultBump";
            type: "u8";
          }
        ];
      };
    }
  ];
  constants: [
    {
      name: "seed";
      type: "string";
      value: '"anchor"';
    }
  ];
};
