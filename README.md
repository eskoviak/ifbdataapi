# Enterprise API Specification Libarary

## Usage

1. Clone this repository to your computer.

2. Ensure that the [node-js](https://nodejs.org/en/) program is installed and available in your repository.

3. Once node is installed, you need to install `gulp`, which is used to validate the JSON files.  To install, type the following at the command prompt at the top level of the directory:
   
   ```
   $> npm gulp install
   ...
   $> npm install       <--installs dependancies
   ```

   You will notice a new directory called node_modules; this folder is excluded from git control, and contains files needed by node/gulp.

4. When editing files, it is helpful to check changes for typos, etc.  At the command prompt, at the top level of the repository, enter:

   ```
   $> gulp validate
   ...
   [ok]...
   ...

   $>
   ```

   Any errors will be displayed.  These MUST be corrected prior to commiting the changes.

5. When changes are complete, the JSON bundle files for export to WS02 are created by executing the following at the command prompt:

   ```
   $> node bundler-json
   ...
   $>
   ```

   This should indicate no errors.

## Using Swagger (OpenAPI)

OpenAPI (formerly known as Swagger) is a [specification](http://swagger.io/specification/) for defining APIs.  It is currently in version 2.0.  While swagger is the specification, it is expressed in either YAML or JSON (the idioms can be mixed).  The paths directory described above contains the main API contracts which adhere to this specification.

## Using Swagger Editor

*Note:*  The Swagger Editor is only used by developers to view the files in the `swagger/paths` directory, to check for format, validation etc.  For use in the enterprise WS02 Store, the files should be processed into the swagger/bundles directory (as JSON files) using the bundler-json.js script.

  1. Use the [online editor](http://editor.swagger.io) or follow 
	   the [installation instructions](http://swagger.io/swagger-editor/).
  2. In the editor, Use `File->Open` and choose the `swagger.yaml` file in this
		 project.

## Swagger Documentation Notes

* All models MUST have a description
* Properties of with concrete types SHOULD have a description
* Properties of $ref SHOULD NOT have a description--the editor will use the description from the referenced item specification
* Primary id properties should be named `id` and be the first element of the model
* When referencing a id of another model, prefix with the model name, i.e. _clientId_ when referring to the id property of the Client model
* Enumerations of strings:  The first letter MUST be capitalized
* Boolean properties:  Should begin with `is`  
* Unless otherwise specified, the use of `format: date` refers to ISO8601 date format:  *CCYY-MM-DD*, example: 1776-07-04.
* In order to accommodate data which is provided in a a coded and a decoded format, such fields should be modeled as <property> and <property>Code; e.g. _addressType_ and _addressTypeCode_

## Naming Conventions
### Model file names (first letter capitalized)
* &lt;Noun&gt;&lt;[Detail]&gt;-&lt;Life | Personal | Commercial&gt;

### JSON Schema files names
* lowercase
* &lt;path name&gt;-[request | repsonse].json  _i.e._ `client-search-request.json`

### Property Names
* Modified camelCase:  first letter lowercase, then camel case
* No Abbreviations unless the abbreviation is `widely` understood:  atm or vin may be used; notice lower case.
