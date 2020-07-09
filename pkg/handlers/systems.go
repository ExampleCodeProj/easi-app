package handlers

import (
	"encoding/json"
	"net/http"

	"go.uber.org/zap"

	"github.com/cmsgov/easi-app/pkg/appcontext"
	"github.com/cmsgov/easi-app/pkg/models"
)

type fetchSystems func(logger *zap.Logger) (models.SystemShorts, error)

// NewSystemsListHandler is a constructor for SystemListHandler
func NewSystemsListHandler(base HandlerBase, fetch fetchSystems) SystemsListHandler {
	return SystemsListHandler{
		HandlerBase:  base,
		FetchSystems: fetch,
	}
}

// SystemsListHandler is the handler for listing systems
type SystemsListHandler struct {
	HandlerBase
	FetchSystems fetchSystems
}

// Handle handles a web request and returns a list of systems
func (h SystemsListHandler) Handle() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		logger, ok := appcontext.Logger(r.Context())
		if !ok {
			h.Logger.Error("Failed to logger from context in systems list handler")
			logger = h.Logger
		}

		systems, err := h.FetchSystems(logger)
		if err != nil {
			h.WriteErrorResponse(r.Context(), w, err)
			return
		}

		js, err := json.Marshal(systems)
		if err != nil {
			h.WriteErrorResponse(r.Context(), w, err)
			return
		}

		w.Header().Set("Content-Type", "application/json")

		_, err = w.Write(js)
		if err != nil {
			h.WriteErrorResponse(r.Context(), w, err)
			return
		}
	}
}
