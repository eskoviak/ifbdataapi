mc.setProperty('CONTENT_TYPE', 'application/json');
var clientId = mc.getProperty('uri.var.clientId');
mc.setPayloadJSON(
    '{\n' +
    '  "data": [\n' +
    '    {\n' +
    '      "clients": [\n' +
    '        {\n' +
    '          "id": "12345",\n' +
    '          "name": null,\n' +
    '          "personName": {\n' +
    '            "firstName": "Bob",\n' +
    '            "middleName": "A",\n' +
    '            "lastName": "Customer",\n' +
    '            "titlePrefix": null,\n' +
    '            "nameSuffix": null\n' +
    '          },\n' +
    '          "phoneNumbers": [\n' +
    '            {\n' +
    '              "phoneNumber": "555-555-5555",\n' +
    '              "phoneType": "Home",\n' +
    '              "phoneTypeCode": null\n' +
    '            },\n' +
    '            {\n' +
    '              "phoneNumber": "555-555-4444",\n' +
    '              "phoneType": "Cell",\n' +
    '              "phoneTypeCode": null\n' +
    '            }\n' +
    '          ],\n' +
    '          "emailAddresses": [\n' +
    '            {\n' +
    '              "emailAddress": "bob@example.com",\n' +
    '              "emailAddressType": "CON"\n' +
    '            },\n' +
    '            {\n' +
    '              "emailAddress": "robert@example.com",\n' +
    '              "emailAddressType": "INC"\n' +
    '            }\n' +
    '          ],\n' +
    '          "taxId": null,\n' +
    '          "addresses": [\n' +
    '            {\n' +
    '              "addressType": "PLM",\n' +
    '              "effectiveDate": "2011-01-01",\n' +
    '              "associatedObject": "APV 1234567",\n' +
    '              "addressAggregate": null,\n' +
    '              "street1": "PO BOX 202",\n' +
    '              "street2": null,\n' +
    '              "city": "MEROM",\n' +
    '              "state": "IN",\n' +
    '              "countyCode": null,\n' +
    '              "county": "Sullivan (Gill)",\n' +
    '              "townshipCode": null,\n' +
    '              "township": null,\n' +
    '              "postalCode": "47861-0202",\n' +
    '              "country": null\n' +
    '            },\n' +
    '            {\n' +
    '              "addressType": "PLD",\n' +
    '              "effectiveDate": "2011-01-01",\n' +
    '              "associatedObject": "APV 1234567",\n' +
    '              "addressAggregate": null,\n' +
    '              "street1": "PO BOX 202",\n' +
    '              "street2": null,\n' +
    '              "city": "MEROM",\n' +
    '              "state": "IN",\n' +
    '              "countyCode": null,\n' +
    '              "county": "Sullivan (Gill)",\n' +
    '              "townshipCode": null,\n' +
    '              "township": null,\n' +
    '              "postalCode": "47861-0202",\n' +
    '              "country": null\n' +
    '            }\n' +
    '          ],\n' +
    '          "preferences": [\n' +
    '            {\n' +
    '              "key": null,\n' +
    '              "value": null\n' +
    '            }\n' +
    '          ],\n' +
    '          "demographics": {\n' +
    '            "gender": null,\n' +
    '            "genderCode": null,\n' +
    '            "maritalStatus": null,\n' +
    '            "maritalStatusCode": null,\n' +
    '            "dateOfBirth": "1980-01-01",\n' +
    '            "dateOfDeath": null,\n' +
    '            "driversLicenseState": null,\n' +
    '            "driversLicenseNumber": null\n' +
    '          },\n' +
    '          "clientAccountNumber": null,\n' +
    '          "policyNumber": "APV 1234567",\n' +
    '          "agentCode": null,\n' +
    '          "claimNumber": null,\n' +
    '          "billingAccountNumber": null\n' +
    '        }\n' +
    '      ]\n' +
    '    }\n' +
    '  ]\n' +

    '}'
);
		