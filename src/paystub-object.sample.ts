const sample = {
  "buckets": [
    {
      "gross": true,
      "id": "B01",
      "label": "Earnings",
      "net": false,
      "category": "E",
      "drillable": true,
      "order": "001"
    },
    {
      "gross": false,
      "id": "B02",
      "label": "EE Taxes",
      "net": false,
      "category": "D",
      "drillable": true,
      "order": "002"
    },
    {
      "gross": false,
      "id": "B03",
      "label": "EE Benefits Pre-tax Deductions",
      "net": false,
      "category": "D",
      "drillable": true,
      "order": "003"
    },
    {
      "gross": false,
      "id": "B04",
      "label": "EE Benefits Post-Tax Deductions",
      "net": false,
      "category": "D",
      "drillable": true,
      "order": "004"
    },
    {
      "gross": false,
      "id": "B05",
      "label": "Employee Deductions",
      "net": false,
      "category": "D",
      "drillable": true,
      "order": "005"
    },
    {
      "gross": false,
      "id": "B06",
      "label": "Net Pay",
      "net": true,
      "category": "P",
      "drillable": true,
      "order": "006"
    },
    {
      "gross": false,
      "id": "B07",
      "label": "Employer Contributions",
      "net": false,
      "category": "C",
      "drillable": true,
      "order": "007"
    },
    {
      "gross": false,
      "id": "BFED",
      "label": "Federal Taxable Wages",
      "net": false,
      "category": "O",
      "drillable": false,
      "order": "099"
    }
  ],
  "payments": [
    {
      "date": "2020-12-15",
      "amount": 2258.65,
      "gross": 3069.1,
      "isSigned": "",
      "buckets": [
        {
          "amount": -662.23,
          "wagetypes": [
            {
              "amount": -429.11,
              "hours": 0,
              "rate": 0,
              "retro": false,
              "legacy_id": "/401",
              "currency": "",
              "id": "/401TX Withholding Tax Federal",
              "label": "TX Withholding Tax Federal",
              "percent": 0,
              "YTDamount": -9078.77,
              "order": 0
            },
            {
              "amount": -188.93,
              "hours": 0,
              "rate": 0,
              "retro": false,
              "legacy_id": "/403",
              "currency": "",
              "id": "/403TX EE Social Security Tax Federal",
              "label": "TX EE Social Security Tax Federal",
              "percent": 0,
              "YTDamount": -4764.53,
              "order": 1
            },
            {
              "amount": -44.19,
              "hours": 0,
              "rate": 0,
              "retro": false,
              "legacy_id": "/405",
              "currency": "",
              "id": "/405TX EE Medicare Tax Federal",
              "label": "TX EE Medicare Tax Federal",
              "percent": 0,
              "YTDamount": -1114.29,
              "order": 2
            }
          ],
          "id": "B02",
          "net": false,
          "YTDamount": -14957.59,
          "order": "002"
        },
        {
          "amount": -148.22,
          "wagetypes": [
            {
              "amount": -8.96,
              "hours": 0,
              "rate": 0,
              "retro": false,
              "legacy_id": "7104",
              "currency": "",
              "id": "7104*HEALTH SAVINGS ACCT",
              "label": "*HEALTH SAVINGS ACCT",
              "percent": 0,
              "YTDamount": -205.97,
              "order": 0
            },
            {
              "amount": -16.5,
              "hours": 0,
              "rate": 0,
              "retro": false,
              "legacy_id": "7142",
              "currency": "",
              "id": "7142*HEALTH CARE",
              "label": "*HEALTH CARE",
              "percent": 0,
              "YTDamount": -379.5,
              "order": 1
            },
            {
              "amount": -122.76,
              "hours": 0,
              "rate": 0,
              "retro": false,
              "legacy_id": "8104",
              "currency": "",
              "id": "8104*RSP PRE-TAX BASIC",
              "label": "*RSP PRE-TAX BASIC",
              "percent": 0,
              "YTDamount": -2751.1,
              "order": 2
            }
          ],
          "id": "B03",
          "net": false,
          "YTDamount": -3336.5699999999997,
          "order": "003"
        },
        {
          "amount": 2258.65,
          "wagetypes": [
            {
              "amount": 2258.65,
              "hours": 0,
              "rate": 0,
              "retro": false,
              "legacy_id": "/560",
              "currency": "",
              "id": "/560Amount to be paid",
              "label": "Amount to be paid",
              "percent": 0,
              "YTDamount": 58710.32,
              "order": 0
            }
          ],
          "id": "B06",
          "net": true,
          "YTDamount": 58710.32,
          "order": "006"
        },
        {
          "amount": 3.69,
          "wagetypes": [
            {
              "amount": 3.69,
              "hours": 0,
              "rate": 0,
              "retro": false,
              "legacy_id": "3808",
              "currency": "",
              "id": "3808GVUL",
              "label": "GVUL",
              "percent": 0,
              "YTDamount": 42.54,
              "order": 0
            },
            {
              "amount": 0,
              "hours": 0,
              "rate": 0,
              "retro": false,
              "legacy_id": "3885",
              "currency": "",
              "id": "3885II-GMRecognition",
              "label": "II-GMRecognition",
              "percent": 0,
              "YTDamount": 385.76,
              "order": 1
            },
            {
              "amount": 0,
              "hours": 0,
              "rate": 0,
              "retro": false,
              "legacy_id": "8200",
              "currency": "",
              "id": "8200HSA Employer contribution",
              "label": "HSA Employer contribution",
              "percent": 0,
              "YTDamount": 1500,
              "order": 2
            }
          ],
          "id": "B07",
          "net": false,
          "YTDamount": 1928.3,
          "order": "007"
        },
        {
          "amount": 2924.57,
          "wagetypes": [
            {
              "amount": 2924.57,
              "hours": 0,
              "rate": 0,
              "retro": false,
              "legacy_id": "/701",
              "currency": "",
              "id": "/701RE Withholding Tax Federal",
              "label": "RE Withholding Tax Federal",
              "percent": 0,
              "YTDamount": 74096.21,
              "order": 0
            }
          ],
          "id": "BFED",
          "net": false,
          "YTDamount": 74096.21,
          "order": "099"
        },
        {
          "amount": 3069.1,
          "wagetypes": [
            {
              "amount": 3069.1,
              "hours": 0,
              "rate": 0,
              "retro": false,
              "legacy_id": "1003",
              "currency": "",
              "id": "1003SALARY EXEMPT",
              "label": "SALARY EXEMPT",
              "percent": 0,
              "YTDamount": 64074.8,
              "order": 0
            },
            {
              "amount": 0,
              "hours": 0,
              "rate": 0,
              "retro": false,
              "legacy_id": "2101",
              "currency": "",
              "id": "2101OVERTIME PREMIUM",
              "label": "OVERTIME PREMIUM",
              "percent": 0,
              "YTDamount": 140,
              "order": 1
            },
            {
              "amount": 0,
              "hours": 0,
              "rate": 0,
              "retro": false,
              "legacy_id": "2121",
              "currency": "",
              "id": "2121OVERTIME STRAIGHT TIME1.0",
              "label": "OVERTIME STRAIGHT TIME1.0",
              "percent": 0,
              "YTDamount": 280,
              "order": 2
            },
            {
              "amount": 0,
              "hours": 0,
              "rate": 0,
              "retro": false,
              "legacy_id": "3613",
              "currency": "",
              "id": "3613EVP",
              "label": "EVP",
              "percent": 0,
              "YTDamount": 7704.17,
              "order": 3
            },
            {
              "amount": 0,
              "hours": 0,
              "rate": 0,
              "retro": false,
              "legacy_id": "3942",
              "currency": "",
              "id": "3942SALARY DEFERRAL",
              "label": "SALARY DEFERRAL",
              "percent": 0,
              "YTDamount": 4703.6,
              "order": 4
            },
            {
              "amount": 0,
              "hours": 0,
              "rate": 0,
              "retro": false,
              "legacy_id": "5012",
              "currency": "",
              "id": "5012Interest",
              "label": "Interest",
              "percent": 0,
              "YTDamount": 101.91,
              "order": 5
            }
          ],
          "id": "B01",
          "net": false,
          "YTDamount": 77004.48000000001,
          "order": "001"
        }
      ],
      "pernr": "10410836",
      "from": "2020-12-01",
      "currency": "USD",
      "id": "36353936353D383B3535353C352636",
      "to": "2020-12-15",
      "YTDamount": 77004.48
    },
    {
      "date": "2020-12-31",
      "amount": 2301.11,
      "gross": 3127.9,
      "isSigned": "",
      "buckets": [
        {
          "amount": -678.58,
          "wagetypes": [
            {
              "amount": -441.24,
              "hours": 0,
              "rate": 0,
              "retro": false,
              "legacy_id": "/401",
              "currency": "",
              "id": "/401TX Withholding Tax Federal",
              "label": "TX Withholding Tax Federal",
              "percent": 0,
              "YTDamount": -9520.01,
              "order": 0
            },
            {
              "amount": -192.36,
              "hours": 0,
              "rate": 0,
              "retro": false,
              "legacy_id": "/403",
              "currency": "",
              "id": "/403TX EE Social Security Tax Federal",
              "label": "TX EE Social Security Tax Federal",
              "percent": 0,
              "YTDamount": -4956.89,
              "order": 1
            },
            {
              "amount": -44.98,
              "hours": 0,
              "rate": 0,
              "retro": false,
              "legacy_id": "/405",
              "currency": "",
              "id": "/405TX EE Medicare Tax Federal",
              "label": "TX EE Medicare Tax Federal",
              "percent": 0,
              "YTDamount": -1159.27,
              "order": 2
            }
          ],
          "id": "B02",
          "net": false,
          "YTDamount": -15636.170000000002,
          "order": "002"
        },
        {
          "amount": -148.21,
          "wagetypes": [
            {
              "amount": -8.95,
              "hours": 0,
              "rate": 0,
              "retro": false,
              "legacy_id": "7104",
              "currency": "",
              "id": "7104*HEALTH SAVINGS ACCT",
              "label": "*HEALTH SAVINGS ACCT",
              "percent": 0,
              "YTDamount": -214.92,
              "order": 0
            },
            {
              "amount": -16.5,
              "hours": 0,
              "rate": 0,
              "retro": false,
              "legacy_id": "7142",
              "currency": "",
              "id": "7142*HEALTH CARE",
              "label": "*HEALTH CARE",
              "percent": 0,
              "YTDamount": -396,
              "order": 1
            },
            {
              "amount": -122.76,
              "hours": 0,
              "rate": 0,
              "retro": false,
              "legacy_id": "8104",
              "currency": "",
              "id": "8104*RSP PRE-TAX BASIC",
              "label": "*RSP PRE-TAX BASIC",
              "percent": 0,
              "YTDamount": -2873.86,
              "order": 2
            }
          ],
          "id": "B03",
          "net": false,
          "YTDamount": -3484.78,
          "order": "003"
        },
        {
          "amount": 2301.11,
          "wagetypes": [
            {
              "amount": 2301.11,
              "hours": 0,
              "rate": 0,
              "retro": false,
              "legacy_id": "/560",
              "currency": "",
              "id": "/560Amount to be paid",
              "label": "Amount to be paid",
              "percent": 0,
              "YTDamount": 61011.43,
              "order": 0
            }
          ],
          "id": "B06",
          "net": true,
          "YTDamount": 61011.43,
          "order": "006"
        },
        {
          "amount": 0,
          "wagetypes": [
            {
              "amount": 0,
              "hours": 0,
              "rate": 0,
              "retro": false,
              "legacy_id": "3808",
              "currency": "",
              "id": "3808GVUL",
              "label": "GVUL",
              "percent": 0,
              "YTDamount": 42.54,
              "order": 0
            },
            {
              "amount": 0,
              "hours": 0,
              "rate": 0,
              "retro": false,
              "legacy_id": "3885",
              "currency": "",
              "id": "3885II-GMRecognition",
              "label": "II-GMRecognition",
              "percent": 0,
              "YTDamount": 385.76,
              "order": 1
            },
            {
              "amount": 0,
              "hours": 0,
              "rate": 0,
              "retro": false,
              "legacy_id": "8200",
              "currency": "",
              "id": "8200HSA Employer contribution",
              "label": "HSA Employer contribution",
              "percent": 0,
              "YTDamount": 1500,
              "order": 2
            }
          ],
          "id": "B07",
          "net": false,
          "YTDamount": 1928.3,
          "order": "007"
        },
        {
          "amount": 2979.69,
          "wagetypes": [
            {
              "amount": 2979.69,
              "hours": 0,
              "rate": 0,
              "retro": false,
              "legacy_id": "/701",
              "currency": "",
              "id": "/701RE Withholding Tax Federal",
              "label": "RE Withholding Tax Federal",
              "percent": 0,
              "YTDamount": 77075.9,
              "order": 0
            }
          ],
          "id": "BFED",
          "net": false,
          "YTDamount": 77075.9,
          "order": "099"
        },
        {
          "amount": 3127.8999999999996,
          "wagetypes": [
            {
              "amount": 3069.1,
              "hours": 0,
              "rate": 0,
              "retro": false,
              "legacy_id": "1003",
              "currency": "",
              "id": "1003SALARY EXEMPT",
              "label": "SALARY EXEMPT",
              "percent": 0,
              "YTDamount": 67143.9,
              "order": 0
            },
            {
              "amount": 19.6,
              "hours": 0,
              "rate": 0,
              "retro": false,
              "legacy_id": "2101",
              "currency": "",
              "id": "2101OVERTIME PREMIUM",
              "label": "OVERTIME PREMIUM",
              "percent": 0,
              "YTDamount": 159.6,
              "order": 1
            },
            {
              "amount": 39.2,
              "hours": 0,
              "rate": 0,
              "retro": false,
              "legacy_id": "2121",
              "currency": "",
              "id": "2121OVERTIME STRAIGHT TIME1.0",
              "label": "OVERTIME STRAIGHT TIME1.0",
              "percent": 0,
              "YTDamount": 319.2,
              "order": 2
            },
            {
              "amount": 0,
              "hours": 0,
              "rate": 0,
              "retro": false,
              "legacy_id": "3613",
              "currency": "",
              "id": "3613EVP",
              "label": "EVP",
              "percent": 0,
              "YTDamount": 7704.17,
              "order": 3
            },
            {
              "amount": 0,
              "hours": 0,
              "rate": 0,
              "retro": false,
              "legacy_id": "3942",
              "currency": "",
              "id": "3942SALARY DEFERRAL",
              "label": "SALARY DEFERRAL",
              "percent": 0,
              "YTDamount": 4703.6,
              "order": 4
            },
            {
              "amount": 0,
              "hours": 0,
              "rate": 0,
              "retro": false,
              "legacy_id": "5012",
              "currency": "",
              "id": "5012Interest",
              "label": "Interest",
              "percent": 0,
              "YTDamount": 101.91,
              "order": 5
            }
          ],
          "id": "B01",
          "net": false,
          "YTDamount": 80132.38,
          "order": "001"
        }
      ],
      "pernr": "10410836",
      "from": "2020-12-16",
      "currency": "USD",
      "id": "36353936353D383B3535353D352635",
      "to": "2020-12-31",
      "YTDamount": 80132.38
    }
  ]
}
export default sample;