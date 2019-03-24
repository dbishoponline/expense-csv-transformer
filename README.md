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

To transform a csv file and ***combine labels/notes*** into the description, run the following command:
```
$ mintx path/to/expenses.csv -c
```

Then import into Quickbooks Online
