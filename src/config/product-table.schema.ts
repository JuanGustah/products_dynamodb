export const productTableSchema = {
    TableName: "Products",
    AttributeDefinitions: [
      {
        AttributeName: "SKU",
        AttributeType: "S",
      },
      {
        AttributeName: "category",
        AttributeType: "S",
      },
      // {
      //   AttributeName: "name",
      //   AttributeType: "S",
      // },
      // {
      //   AttributeName: "description",
      //   AttributeType: "S",
      // },
      // {
      //   AttributeName: "quantity",
      //   AttributeType: "N",
      // },
      // {
      //   AttributeName: "price",
      //   AttributeType: "N",
      // },
      {
        AttributeName: "branch",
        AttributeType: "S",
      },
      {
        AttributeName: "country",
        AttributeType: "S",
      }
    ],
    KeySchema: [
      {
        AttributeName: "SKU",
        KeyType: "HASH",
      },
      {
        AttributeName: "country",
        KeyType: "RANGE",
      },
    ],
    LocalSecondaryIndexes:[
        {
            IndexName: "BY_BRANCH",
            KeySchema: [
              {
                AttributeName: "SKU",
                KeyType: "HASH",
              },
              {
                AttributeName: "branch",
                KeyType: "RANGE",
              },
            ],
            Projection: {
              ProjectionType: "ALL"
            },
        },
        {
            IndexName: "BY_CATEGORY",
            KeySchema: [
              {
                AttributeName: "SKU",
                KeyType: "HASH",
              },
              {
                AttributeName: "category",
                KeyType: "RANGE",
              },
            ],
            Projection: {
              ProjectionType: "ALL"
            },
        },
    ],
    ProvisionedThroughput:{
      'ReadCapacityUnits': 10,
      'WriteCapacityUnits': 10
    }
}