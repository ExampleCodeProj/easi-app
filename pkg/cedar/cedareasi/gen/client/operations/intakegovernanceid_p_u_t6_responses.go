// Code generated by go-swagger; DO NOT EDIT.

package operations

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"fmt"
	"io"

	"github.com/go-openapi/runtime"
	"github.com/go-openapi/strfmt"

	"github.com/cmsgov/easi-app/pkg/cedar/cedareasi/gen/models"
)

// IntakegovernanceidPUT6Reader is a Reader for the IntakegovernanceidPUT6 structure.
type IntakegovernanceidPUT6Reader struct {
	formats strfmt.Registry
}

// ReadResponse reads a server response into the received o.
func (o *IntakegovernanceidPUT6Reader) ReadResponse(response runtime.ClientResponse, consumer runtime.Consumer) (interface{}, error) {
	switch response.Code() {
	case 200:
		result := NewIntakegovernanceidPUT6OK()
		if err := result.readResponse(response, consumer, o.formats); err != nil {
			return nil, err
		}
		return result, nil
	case 401:
		result := NewIntakegovernanceidPUT6Unauthorized()
		if err := result.readResponse(response, consumer, o.formats); err != nil {
			return nil, err
		}
		return nil, result

	default:
		return nil, runtime.NewAPIError("response status code does not match any response statuses defined for this endpoint in the swagger spec", response, response.Code())
	}
}

// NewIntakegovernanceidPUT6OK creates a IntakegovernanceidPUT6OK with default headers values
func NewIntakegovernanceidPUT6OK() *IntakegovernanceidPUT6OK {
	return &IntakegovernanceidPUT6OK{}
}

/*IntakegovernanceidPUT6OK handles this case with default header values.

OK
*/
type IntakegovernanceidPUT6OK struct {
	Payload *models.IntakegovernanceidPUTResponse
}

func (o *IntakegovernanceidPUT6OK) Error() string {
	return fmt.Sprintf("[PUT /intake/governance/{id}][%d] intakegovernanceidPUT6OK  %+v", 200, o.Payload)
}

func (o *IntakegovernanceidPUT6OK) GetPayload() *models.IntakegovernanceidPUTResponse {
	return o.Payload
}

func (o *IntakegovernanceidPUT6OK) readResponse(response runtime.ClientResponse, consumer runtime.Consumer, formats strfmt.Registry) error {

	o.Payload = new(models.IntakegovernanceidPUTResponse)

	// response payload
	if err := consumer.Consume(response.Body(), o.Payload); err != nil && err != io.EOF {
		return err
	}

	return nil
}

// NewIntakegovernanceidPUT6Unauthorized creates a IntakegovernanceidPUT6Unauthorized with default headers values
func NewIntakegovernanceidPUT6Unauthorized() *IntakegovernanceidPUT6Unauthorized {
	return &IntakegovernanceidPUT6Unauthorized{}
}

/*IntakegovernanceidPUT6Unauthorized handles this case with default header values.

Access Denied
*/
type IntakegovernanceidPUT6Unauthorized struct {
}

func (o *IntakegovernanceidPUT6Unauthorized) Error() string {
	return fmt.Sprintf("[PUT /intake/governance/{id}][%d] intakegovernanceidPUT6Unauthorized ", 401)
}

func (o *IntakegovernanceidPUT6Unauthorized) readResponse(response runtime.ClientResponse, consumer runtime.Consumer, formats strfmt.Registry) error {

	return nil
}
