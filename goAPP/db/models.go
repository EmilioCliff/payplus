package db

import "database/sql"

type Store struct{
	store *sql.DB
}

type Department struct {
	Code        string    `json:"code"`
	Description string `json:"description"`
}

func NewStore(db *sql.DB) *Store {
	return &Store{
		store: db,
	}
}