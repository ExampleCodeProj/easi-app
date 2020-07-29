// Code generated by go-swagger; DO NOT EDIT.

package operations

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"fmt"
	"io"

	"github.com/go-openapi/runtime"

	strfmt "github.com/go-openapi/strfmt"

	models "github.com/cmsgov/easi-app/pkg/cedar/cedarldap/gen/models"
)

// AuthenticateReader is a Reader for the Authenticate structure.
type AuthenticateReader struct {
	formats strfmt.Registry
}

// ReadResponse reads a server response into the received o.
func (o *AuthenticateReader) ReadResponse(response runtime.ClientResponse, consumer runtime.Consumer) (interface{}, error) {
	switch response.Code() {
	case 200:
		result := NewAuthenticateOK()
		if err := result.readResponse(response, consumer, o.formats); err != nil {
			return nil, err
		}
		return result, nil
	case 401:
		result := NewAuthenticateUnauthorized()
		if err := result.readResponse(response, consumer, o.formats); err != nil {
			return nil, err
		}
		return nil, result

	default:
		return nil, runtime.NewAPIError("unknown error", response, response.Code())
	}
}

// NewAuthenticateOK creates a AuthenticateOK with default headers values
func NewAuthenticateOK() *AuthenticateOK {
	return &AuthenticateOK{}
}

/*AuthenticateOK handles this case with default header values.

OK
*/
type AuthenticateOK struct {
	Payload *models.AuthenticateResponse
}

func (o *AuthenticateOK) Error() string {
	return fmt.Sprintf("[GET /authenticate][%d] authenticateOK  %+v", 200, o.Payload)
}

func (o *AuthenticateOK) GetPayload() *models.AuthenticateResponse {
	return o.Payload
}

func (o *AuthenticateOK) readResponse(response runtime.ClientResponse, consumer runtime.Consumer, formats strfmt.Registry) error {

	o.Payload = new(models.AuthenticateResponse)

	// response payload
	if err := consumer.Consume(response.Body(), o.Payload); err != nil && err != io.EOF {
		return err
	}

	return nil
}

// NewAuthenticateUnauthorized creates a AuthenticateUnauthorized with default headers values
func NewAuthenticateUnauthorized() *AuthenticateUnauthorized {
	return &AuthenticateUnauthorized{}
}

/*AuthenticateUnauthorized handles this case with default header values.

Access Denied
*/
type AuthenticateUnauthorized struct {
}

func (o *AuthenticateUnauthorized) Error() string {
	return fmt.Sprintf("[GET /authenticate][%d] authenticateUnauthorized ", 401)
}

func (o *AuthenticateUnauthorized) readResponse(response runtime.ClientResponse, consumer runtime.Consumer, formats strfmt.Registry) error {

	return nil
}
