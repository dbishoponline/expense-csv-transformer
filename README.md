# Expenses CSV Transform

## Requirements
- CSV file of transactions exported from Mint.com
- Node.js

## Install
Clone the repo and run the following command from the root of the repo
```
$ make
```

## How to Use
To transform a csv file, run the following command:
```
$ mintx path/to/expenses.csv
```

The transformed csv file has ***labels/notes combined*** into the description

To filter transactions by year (2018), run the following command:
```
$ mintx path/to/expenses.csv 2018
```

Then import into Quickbooks Online
