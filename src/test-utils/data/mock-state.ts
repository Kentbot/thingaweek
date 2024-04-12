import { AppState } from "@/budget/store/store";

/**
 * Load this into the browser to visualise what's going on.
 */

export const mockState: AppState = {
  "expenseCategories": [
    {
      "id": "6II4jVMLSggRPtft_VVay",
      "name": "Cat 1",
      "additionalIncome": "0",
      "budgetedAmount": "3,000",
      "endOfMonthAdjust": "0",
      "transactionIds": [
        "WIh6m1gi_QdR5mwsTnY0R",
        "BgIvc011NL80oIBTuglQE",
        "la6geNFSh2zxYV6qRm1ii",
        "MXFkVZKIUGUz5fnbLE9pt",
        "mcAv8k0DB6k7vVc0FNi7h"
      ],
      "budgetMonth": "2024-04-12",
      "linkedMonths": {}
    },
    {
      "id": "tLfKxSp4vbOcmzxK4pGJO",
      "name": "Cat 2",
      "additionalIncome": "0",
      "budgetedAmount": "500",
      "endOfMonthAdjust": "0",
      "transactionIds": [
        "bwmUdgbl_dG7AXtJD8Lln",
        "f5I2Qt3rzVB0qy8YshZhc",
        "kKkakKHiZ4fR0iZzFe4X4",
        "H6yehtxzi2b3C8LPvfnwJ"
      ],
      "budgetMonth": "2024-04-12",
      "linkedMonths": {}
    },
    {
      "id": "8_MKTOIcZdUho1LXQI7vY",
      "name": "Cat 3",
      "additionalIncome": "0",
      "budgetedAmount": "500",
      "endOfMonthAdjust": "0",
      "transactionIds": [
        "9jJtk-ZUOzldLGP1uGPvH",
        "yx8i9hFjhUayPtYtb1Ix-",
        "Tf2cCNJ2d0nQpnJvOycRh",
        "L_14auel8hq7fZDyPGwYU"
      ],
      "budgetMonth": "2024-04-12",
      "linkedMonths": {}
    }
  ],
  "incomeCategories": [
    {
      "id": "dQXwpw1_UgiyK-_pDqbYi",
      "budgetMonth": "2024-04-12",
      "name": "Income 1",
      "expectedIncome": "2000",
      "transactionIds": [
        "OiAyEXgzaVt5RzHvuYWSQ",
        "LLOnHW-Z4rJeWRZb5_emV",
        "IqSnQkairXxrNlo3Dvqh1",
        "yzKUQcHiV4f4b6-u_POC4"
      ],
      "linkedMonths": {}
    },
    {
      "id": "JvtUOIikaST_1UnRHkiEI",
      "budgetMonth": "2024-04-12",
      "name": "Income 2",
      "expectedIncome": "2000",
      "transactionIds": [
        "fGl-jpkHB1Ue8KGxgdKtc",
        "AKqsFXwH8GaaiItryJ7L3",
        "fWXjsKpqxIp0zCdmTRCoi"
      ],
      "linkedMonths": {}
    }
  ],
  "groups": [
    {
      "id": "-LaTcm7_vRXM0NPvNu_rU",
      "name": "Group 1",
      "categoryIds": [
        "6II4jVMLSggRPtft_VVay",
        "tLfKxSp4vbOcmzxK4pGJO"
      ],
      "budgetMonth": "2024-04-12",
      "linkedGroups": {}
    },
    {
      "id": "_QdrGvLhXJbBUPnHsr92L",
      "name": "Group 2",
      "categoryIds": [
        "8_MKTOIcZdUho1LXQI7vY"
      ],
      "budgetMonth": "2024-04-12",
      "linkedGroups": {}
    }
  ],
  "transactions": [
    {
      "amount": "2201.05",
      "date": "2024-01-19",
      "description": "CITI CARD ONLINE",
      "id": "mcAv8k0DB6k7vVc0FNi7h",
      "budgetMonth": "2024-04-12"
    },
    {
      "amount": "-74.66",
      "date": "2024-01-17",
      "description": "GENESYS CLOUD SE",
      "id": "fWXjsKpqxIp0zCdmTRCoi",
      "budgetMonth": "2024-04-12"
    },
    {
      "amount": "-58.64",
      "date": "2024-01-17",
      "description": "VENMO",
      "id": "yzKUQcHiV4f4b6-u_POC4",
      "budgetMonth": "2024-04-12"
    },
    {
      "amount": "13.28",
      "date": "2024-01-17",
      "description": "CPENERGY MNGCO",
      "id": "L_14auel8hq7fZDyPGwYU",
      "budgetMonth": "2024-04-12"
    },
    {
      "amount": "1000.00",
      "date": "2024-01-16",
      "description": "VENMO",
      "id": "MXFkVZKIUGUz5fnbLE9pt",
      "budgetMonth": "2024-04-12"
    },
    {
      "amount": "20.00",
      "date": "2024-01-16",
      "description": "VENMO",
      "id": "H6yehtxzi2b3C8LPvfnwJ",
      "budgetMonth": "2024-04-12"
    },
    {
      "amount": "120.00",
      "date": "2024-01-12",
      "description": "VENMO",
      "id": "Tf2cCNJ2d0nQpnJvOycRh",
      "budgetMonth": "2024-04-12"
    },
    {
      "amount": "-259.20",
      "date": "2024-01-11",
      "description": "Mobile Check Deposit",
      "id": "IqSnQkairXxrNlo3Dvqh1",
      "budgetMonth": "2024-04-12"
    },
    {
      "amount": "-2503.68",
      "date": "2024-01-10",
      "description": "GENESYS CLOUD SE",
      "id": "AKqsFXwH8GaaiItryJ7L3",
      "budgetMonth": "2024-04-12"
    },
    {
      "amount": "23.79",
      "date": "2024-01-10",
      "description": "MARKEL PERSONAL",
      "id": "kKkakKHiZ4fR0iZzFe4X4",
      "budgetMonth": "2024-04-12"
    },
    {
      "amount": "-918.57",
      "date": "2024-01-09",
      "description": "Mobile Check Deposit",
      "id": "LLOnHW-Z4rJeWRZb5_emV",
      "budgetMonth": "2024-04-12"
    },
    {
      "amount": "67.95",
      "date": "2024-01-09",
      "description": "CPENERGY MNGCO",
      "id": "la6geNFSh2zxYV6qRm1ii",
      "budgetMonth": "2024-04-12"
    },
    {
      "amount": "39.13",
      "date": "2024-01-08",
      "description": "VENMO",
      "id": "f5I2Qt3rzVB0qy8YshZhc",
      "budgetMonth": "2024-04-12"
    },
    {
      "amount": "249.02",
      "date": "2024-01-08",
      "description": "VENMO",
      "id": "yx8i9hFjhUayPtYtb1Ix-",
      "budgetMonth": "2024-04-12"
    },
    {
      "amount": "77.04",
      "date": "2024-01-04",
      "description": "HEALTHEQUITY INC",
      "id": "9jJtk-ZUOzldLGP1uGPvH",
      "budgetMonth": "2024-04-12"
    },
    {
      "amount": "200.00",
      "date": "2024-01-04",
      "description": "VENMO",
      "id": "BgIvc011NL80oIBTuglQE",
      "budgetMonth": "2024-04-12"
    },
    {
      "amount": "-550.00",
      "date": "2024-01-03",
      "description": "VENMO",
      "id": "OiAyEXgzaVt5RzHvuYWSQ",
      "budgetMonth": "2024-04-12"
    },
    {
      "amount": "37.12",
      "date": "2024-01-03",
      "description": "VENMO",
      "id": "bwmUdgbl_dG7AXtJD8Lln",
      "budgetMonth": "2024-04-12"
    },
    {
      "amount": "-11.90",
      "date": "2024-01-03",
      "description": "Mobile Check Deposit",
      "id": "fGl-jpkHB1Ue8KGxgdKtc",
      "budgetMonth": "2024-04-12"
    },
    {
      "amount": "199.41",
      "date": "2024-01-02",
      "description": "VENMO",
      "id": "WIh6m1gi_QdR5mwsTnY0R",
      "budgetMonth": "2024-04-12"
    }
  ],
  "budgetMonth": "2024-04-12"
}