export type AnchorProject = {
  "version": "0.1.0",
  "name": "anchor_project",
  "instructions": [
    {
      "name": "mintKey",
      "accounts": [
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "luckyKey",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "link",
          "type": "publicKey"
        },
        {
          "name": "portal",
          "type": "u64"
        }
      ]
    },
    {
      "name": "useKey",
      "accounts": [
        {
          "name": "luckyKey",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "claimTreasure",
      "accounts": [
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "luckyKey",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "link",
            "type": "publicKey"
          },
          {
            "name": "used",
            "type": "bool"
          },
          {
            "name": "portal",
            "type": "u64"
          }
        ]
      }
    }
  ]
};

export const IDL: AnchorProject = {
  "version": "0.1.0",
  "name": "anchor_project",
  "instructions": [
    {
      "name": "mintKey",
      "accounts": [
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "luckyKey",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "link",
          "type": "publicKey"
        },
        {
          "name": "portal",
          "type": "u64"
        }
      ]
    },
    {
      "name": "useKey",
      "accounts": [
        {
          "name": "luckyKey",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "claimTreasure",
      "accounts": [
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "luckyKey",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "link",
            "type": "publicKey"
          },
          {
            "name": "used",
            "type": "bool"
          },
          {
            "name": "portal",
            "type": "u64"
          }
        ]
      }
    }
  ]
};
