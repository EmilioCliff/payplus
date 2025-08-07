package api

import (
	"net/http"

	"github.com/EmilioCliff/go-app/db"
	"github.com/gin-gonic/gin"
)

func (server *Server) ListBanks(ctx *gin.Context) {
	banks, err := server.store.ListBanks(ctx)
	if err != nil{
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, banks)
}

func (server *Server) GetBank(ctx *gin.Context) {
	bankRef := ctx.Param("code")
	bank, err := server.store.GetBank(ctx, bankRef)
	if err != nil{
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, bank)
}

func (server *Server) DeleteBank(ctx *gin.Context) {
	bankRef := ctx.Param("code")
	err := server.store.RemoveBank(ctx, bankRef)
	if err != nil{
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"success": "bank deleted successfully"})
}

type CreateBankRequest struct{
	BankRef string `json:"bank_ref"`
	Name string `json:"name"`
	Branch string `json:"branch"`
}

func (server *Server) CreateBank(ctx *gin.Context) {
	var req CreateBankRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	bank, err  := server.store.AddBank(ctx, db.AddBankParams{
		BankRef: req.BankRef,
		Name: req.Name,
		Branch: req.Branch,
	})
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, bank)
}

type UpdateBankRequest struct{
	BankRef string `json:"bank_ref"`	
	Name string `json:"name"`
	Branch string `json:"branch"`
}

func (server *Server) UpdateBank(ctx *gin.Context) {
	var req UpdateBankRequest
	if err := ctx.ShouldBindJSON(&req); err != nil{
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	bank, err := server.store.UpdateBank(ctx, db.UpdateBankParams{
		BankRef: req.BankRef,
		Name: req.Name,
		Branch: req.Branch,
	})
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, bank)
}
