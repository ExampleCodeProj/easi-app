package main

import (
	"github.com/spf13/cobra"

	"github.com/cmsgov/easi-app/cmd/easi/test"
)

var testCmd = &cobra.Command{
	Use:   "test",
	Short: "Test the EASi application",
	Long:  `Test the EASi application`,
	Run: func(cmd *cobra.Command, args []string) {
		if all {
			test.All()
		} else if pretest {
			test.Pretest()
		} else if serverTest {
			test.Server()
		} else {
			test.All()
		}
	},
}

var all bool
var pretest bool
var serverTest bool

func init() {
	testCmd.Flags().BoolVarP(&all, "all", "a", false, "Run all tests")
	testCmd.Flags().BoolVarP(&pretest, "pretest", "p", false, "Run pretests (such as linters)")
	testCmd.Flags().BoolVarP(&serverTest, "server", "s", false, "Run server tests")
}
