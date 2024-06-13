package db

import (
	"context"
	"database/sql"
	"log"
)

func (q *Store) ListDepartments(ctx context.Context)([]Department, error) {
	rows, err := q.store.QueryContext(ctx, "SELECT * FROM Departments ORDER BY Code")
	if err != nil {
		log.Println("Failed to retrieve departments" + err.Error())
		return []Department{}, err
	}
	defer rows.Close()

	var data []Department
	for rows.Next() {
		var dept Department
		if err = rows.Scan(&dept.Code, &dept.Description); err != nil {
			log.Println("Error Scanning row: ", err)
			return []Department{}, err
		}

		data = append(data, dept)
	}

	if err = rows.Close(); err != nil {
		log.Println("Error iterating over rows: " + err.Error())
		return  []Department{}, err
	}

	if err = rows.Err(); err != nil {
		log.Println("Error iterating over rows: " + err.Error())
		return  []Department{}, err
	}

	return data, nil
}

type CreateDepartmentParams struct{
	Code string
	Description string
}

func (q *Store) CreateDepartment(ctx context.Context, arg CreateDepartmentParams) (Department, error) {
    query := `
        INSERT INTO Departments (Code, Description)
        OUTPUT inserted.Code, inserted.Description
        VALUES (@p1, @p2)`

    row := q.store.QueryRowContext(ctx, query, sql.Named("p1", arg.Code), sql.Named("p2", arg.Description))

    var result Department
    err := row.Scan(&result.Code, &result.Description)
    if err != nil {
        return Department{}, err
    }
    return result, nil
}

func (q *Store) DeleteDepartment(ctx context.Context, id string) error {
	query := `
		DELETE FROM Departments
		WHERE Code = @p1
	`
	_, err := q.store.ExecContext(ctx, query, sql.Named("p1", id))
	return err
}

type UpdateDepartmentParams struct {
	Code string
	Description string
}

func (q *Store) UpdateDepartment(ctx context.Context, arg UpdateDepartmentParams) (Department, error) {
	query := `
		UPDATE Departments 
		SET Description = @p1 
		OUTPUT inserted.Code, inserted.Description
		WHERE Code = @p2
	`
	row := q.store.QueryRowContext(ctx, query, sql.Named("p1", arg.Description), sql.Named("p2", arg.Code))
	var result Department
	err := row.Scan(
		&result.Code,
		&result.Description,
	)
	return result, err
}

func (q *Store) GetDepartment(ctx context.Context, id int) (Department, error) {
	query := `
		SELECT * FROM Departments
		WHERE Code = @p1
	`
	row := q.store.QueryRowContext(ctx, query, sql.Named("p1", id))
	var result Department
	err := row.Scan(
		&result.Code,
		&result.Description,
	)

	return result, err
}