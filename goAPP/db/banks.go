package db

import (
	"context"
	"database/sql"
	"log"
)

func (q *Store) ListBanks(ctx context.Context) ([]Bank, error) {
	query := `
		SELECT (BankRef, Name, Branch) FROM Bank Codes
	`
	rows, err := q.store.QueryContext(ctx, query)
	if err != nil {
		log.Println("Failed to retrieve banks" + err.Error())
		return []Bank{}, err
	}
	defer rows.Close()

	var data []Bank
	for rows.Next() {
		var dept Bank
		if err = rows.Scan(&dept.BankRef, &dept.Name, &dept.Branch); err != nil {
			log.Println("Error Scanning row: ", err)
			return []Bank{}, err
		}

		data = append(data, dept)
	}

	if err = rows.Close(); err != nil {
		log.Println("Error iterating over rows: " + err.Error())
		return []Bank{}, err
	}

	if err = rows.Err(); err != nil {
		log.Println("Error iterating over rows: " + err.Error())
		return []Bank{}, err
	}

	return data, err

}

type AddBankParams struct{
	BankRef string `json:"bank_ref"`
	Name string `json:"name"`
	Branch string `json:"branch"`
}

func (q *Store) AddBank(ctx context.Context, arg AddBankParams) (Bank, error) {
	query := `
		INSERT INTO Bank Codes (BankRef, Name, Branch)
		OUTPUT inserted.BankRef, inserted.Name, inserted.Branch
		VALUES(@Bankref, @Name, @Branch)
	`
	row := q.store.QueryRowContext(ctx, query, sql.Named("BankRef", arg.BankRef), sql.Named("Name", arg.Name), sql.Named("Branch", arg.Branch))

	var result Bank
	if err := row.Scan(&result.BankRef, &result.Name, &result.Branch); err != nil {
		return Bank{}, err
	}

	return result, nil
}

type UpdateBankParams struct {
	BankRef string `json:"bank_ref"`
	Name string `json:"name"`
	Branch string `json:"branch"`
}

func (q *Store) UpdateBank(ctx context.Context, arg UpdateBankParams) (Bank, error) {
	query := `
		UPDATE Bank Codes
		SET Name = @Name, 
			Branch =  @Branch
		OUTPUT inserted.BankRef, inserted.Name, inserted.Branch
		WHERE BankRef = @BankRef
	`
	row := q.store.QueryRowContext(ctx, query, sql.Named("BankRef", arg.BankRef), sql.Named("Name", arg.Name), sql.Named("Branch", arg.Branch))

	var result Bank
	err := row.Scan(&result.BankRef, &result.Name, &result.Branch)
	return result, err
}

func (q *Store) RemoveBank(ctx context.Context, bankRef string) error {
	query := `
		DELETE FROM Bank Codes 
		WHERE BankRef = @BankRef
	`
	_, err := q.store.ExecContext(ctx, query, sql.Named("BankRef", bankRef))
	return err
}

func (q *Store) GetBank(ctx context.Context, bankRef string) (Bank, error) {
	query := `
		SELECT (BankRef, Name, Branch) FROM Bank Codes
		WHERE BankRef = @BankRef
	`
	row := q.store.QueryRowContext(ctx, query, sql.Named("BankRef", bankRef))

	var result Bank
	if err := row.Scan(&result.BankRef, &result.Name, &result.Branch); err != nil {
		return Bank{}, err
	}

	return result, nil
}