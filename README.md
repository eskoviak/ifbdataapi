# Enterprise API Specification Libarary

## Usage

1. Clone this repository to your computer.

2. Ensure that the node-js program is installed and available in your repository.


## Using Swagger Editor

  1. Use the [online editor](http://editor.swagger.io) or follow 
	   the [installation instructions](http://swagger.io/swagger-editor/).
  2. In the editor, Use `File->Open` and choose the `swagger.yaml` file in this
		 project.

## Swagger Documentation Notes

* All models MUST have a description.
* Properties of single values SHOULD have a description
* Properties of collections SHOULD NOT have a description--the editor will use the description from the collection item specification.
* Primary id properties should be named `id` and be the first element of the
model.  When referencing a id of another model, prefix with the model name, i.e. _clientId_ when referring to the id property of a Client model
* Enumerations of strings:  The first letter MUST be capitalized
* Boolean properties:  Should begin with `is`  
* Unless otherwise specified, the use of `format: date` refers to ISO8601 date format:  *CCYY-MM-DD*, example: 1776-07-04.
* In order to accommodate data which is provided in a a coded and a decoded format, such fields should be modeled as <property> and <property>Code; e.g. _addressType_ and _addressTypeCode_.

## Naming Conventions
### Model file names
* &lt;Noun&gt;&lt;[Detail]&gt;-&lt;Life | Personal | Commercial&gt;

### Property Names
* Modified camelCase:  first letter lowercase, then camel case
* No Abbreviations unless the abbreviation is `widely` understood:  atm or vin may be used; notice lower case.

## Swagger Notation used in Mapping documentation
<dl>
	<dt>[Model Name].[Property]</dt>
	<dd>Specifies a particular property of a Model.  Example:  Coverage.premium specifies the scalar property _premium_ of the model _Coverage_.</dd>
	<dt>{:}</dt>
	<dd>A name:value pair.  For example, Coverage.coverageLimits{:} is an array of CoverageLimit types that are models with a name and value property.
</dl>
