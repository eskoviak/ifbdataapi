mc.setProperty('CONTENT_TYPE', 'application/json');
var clientId = mc.getProperty('uri.var.clientId');
mc.setPayloadJSON(
    '{\n' +
    '  "data": [\n' +
    '    {\n' +
    '        "addresses": [\n' +
    '        {\n' +
    '            "addressType": "PLM",\n' +
    '            "effectiveDate": "2011-01-01",\n' +
    '            "associatedObject": "APV 1234567",\n' +
    '            "addressAggregate": null,\n' +
    '            "street1": "PO BOX 202",\n' +
    '            "street2": null,\n' +
    '            "city": "MEROM",\n' +
    '            "state": "IN",\n' +
    '            "countyCode": null,\n' +
    '            "county": "Sullivan (Gill)",\n' +
    '            "townshipCode": null,\n' +
    '            "township": null,\n' +
    '            "postalCode": "47861-0202",\n' +
    '            "country": null\n' +
    '        },\n' +
    '        {\n' +
    '            "addressType": "PLD",\n' +
    '            "effectiveDate": "2011-01-01",\n' +
    '            "associatedObject": "APV 1234567",\n' +
    '            "addressAggregate": null,\n' +
    '            "street1": "PO BOX 202",\n' +
    '            "street2": null,\n' +
    '            "city": "MEROM",\n' +
    '            "state": "IN",\n' +
    '            "countyCode": null,\n' +
    '            "county": "Sullivan (Gill)",\n' +
    '            "townshipCode": null,\n' +
    '            "township": null,\n' +
    '            "postalCode": "47861-0202",\n' +
    '            "country": null\n' +
    '        }\n' +
    '        ]\n' +
    '    }\n' +
    '    ]\n' +
    '}'
);