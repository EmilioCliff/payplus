package db

import (
	"context"
	"database/sql"
	"log"
)

func (q *Store) ListCounties(ctx context.Context) ([]County, error) {
	rows, err := q.store.QueryContext(ctx, "SELECT * FROM Districts ORDER BY Code")
	if err != nil {
		log.Println("Failed to retrieve counties" + err.Error())
		return []County{}, err
	}
	defer rows.Close()

	var data []County
	for rows.Next() {
		var dept County
		if err = rows.Scan(&dept.Code, &dept.Description); err != nil {
			log.Println("Error Scanning row: ", err)
			return []County{}, err
		}

		data = append(data, dept)
	}

	if err = rows.Close(); err != nil {
		log.Println("Error iterating over rows: " + err.Error())
		return []County{}, err
	}

	if err = rows.Err(); err != nil {
		log.Println("Error iterating over rows: " + err.Error())
		return []County{}, err
	}

	return data, err
}


type CreateCountyParams struct{
	Code string
	Description string
}

func (q *Store) CreateCounty(ctx context.Context, arg CreateCountyParams) (County, error) {
    query := `
        INSERT INTO Districts (Code, Description)
        OUTPUT inserted.Code, inserted.Description
        VALUES (@p1, @p2)`

    row := q.store.QueryRowContext(ctx, query, sql.Named("p1", arg.Code), sql.Named("p2", arg.Description))

    var result County
    err := row.Scan(&result.Code, &result.Description)
    if err != nil {
        return County{}, err
    }
    return result, nil
}

func (q *Store) DeleteCounty(ctx context.Context, id string) error {
	query := `
		DELETE FROM Districts
		WHERE Code = @p1
	`
	_, err := q.store.ExecContext(ctx, query, sql.Named("p1", id))
	return err
}

type UpdateCountyParams struct {
	Code string
	Description string
}

func (q *Store) UpdateCounty(ctx context.Context, arg UpdateCountyParams) (County, error) {
	query := `
		UPDATE Districts 
		SET Description = @p1 
		OUTPUT inserted.Code, inserted.Description
		WHERE Code = @p2
	`
	row := q.store.QueryRowContext(ctx, query, sql.Named("p1", arg.Description), sql.Named("p2", arg.Code))
	var result County
	err := row.Scan(
		&result.Code,
		&result.Description,
	)
	return result, err
}

func (q *Store) GetCounty(ctx context.Context, id string) (County, error) {
	query := `
		SELECT * FROM Districts
		WHERE Code = @p1
	`
	row := q.store.QueryRowContext(ctx, query, sql.Named("p1", id))
	var result County
	err := row.Scan(
		&result.Code,
		&result.Description,
	)

	return result, err
}