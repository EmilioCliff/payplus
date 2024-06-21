package db

import "database/sql"

func NewStore(db *sql.DB) *Store {
	return &Store{
		store: db,
	}
}

type Store struct{
	store *sql.DB
}

type Department struct {
	Code        string    `json:"code"`
	Description string `json:"description"`
}

type County struct{
	Code string `json:"code"`
	Description string `json:"description"`
}

type Bank struct{
	BankRef string `json:"bank_ref"`
	Name string `json:"name"`
	Branch string `json:"branch"`
}