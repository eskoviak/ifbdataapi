# Enterprise API Specification Libarary  
This library is used to contain the [OpenAPI](http://swagger.io/specification/) (swagger) specification files and supporting files (*i.e.* [JSON schemas](http://json-schema.org/documentation.html)) which define the APIs in use at IFBI.  
OpenAPI is currently in version 2.0.  While swagger is the specification, it is expressed in either YAML or JSON (the idioms can be mixed).  The `../swagger/paths` directory contains the main API contracts which adhere to this specification.  
## Structure
![Figure 1:  Repository Main Structure](http://connections/issite/ews/SiteAssets/API%20Model%20Repo%20Structure.png)  
Figure 1:  Repository Main Sructure

* **node_modules**: This folder is used by the npm program and is exluded from git control.  It will be managed on each device by npm.
* **swagger**: This folder contains the structures for the model.   
  - **bundles**:  This folder is the output folder which contains the `.yaml` files contained in the *paths* folder, with all external [$ref](http://swagger.io/specification/#reference-object-75) pointers converted to internal (in-line) references. This folder should not need manual maintenance; it is maintained by the `gulp validate` command.
  * **paths**: The contracts for the APIs are contained in this folder.  The files are named:
    &lt;contract_name&gt;-X.Y.Z.yaml, where:  
      X =:: major release number  
      Y =:: minor release number (currently always 0)  
      Z =:: build number (currently always 0).  
    The X.Y.Z construct **MUST** match the info.version element in the file, as this is used to build the files in the **bundles** directory.  
    Example:  _clients-1.0.0.yaml_ is the contract specification for the clients API, version 1.0.0.
  * **models**:  This folder contains the model files, express in yaml, which are used by the contracts to represent the representation of the resource being requested by the contract.  Models, similar to ojbects or classes, begin with an upper case letter and generally represent nouns (exception:  Interests which represents a relationship between two other models).
  * **schemas**:  This folder contains JSON schemas which are used to specify request and/or response structures used in HTTP PUT, POST and DELETE operations.  These structures are not models as they occur in the header, and not as the body (representation).
* Other Files:  
  * Gulpfile.js:  used by gulp; similar to a Makefile for make, it specifies targets and actions to take to create the targets.  
## Setup  
1. Clone this repository to your computer.
2. Ensure that the [node-js](https://nodejs.org/en/) program is installed and available in your repository.  To test, navigate to the top level directory of the repository on your device (`..\enterpriseapidatamodel`) and enter the following:
    ```
    $> node -v
    v4.X.X
    $>
    ```
    The version string indicates that node is available in your local repository.

3. Once node is installed, you need to install `gulp`, which is used to validate the JSON files.  To install, type the following at the command prompt at the top level of the directory:
   
   ```
   $> npm install -g gulp-cli
   ...
   $> npm install -g gulp
   ...
   $> gulp --help
   [00:00:00] Using gulpfile
   ...
   $>
   ```

   You will notice a new directory called node_modules; this folder is excluded from git control, and contains files needed by node/gulp.

4. When editing files, it is helpful to check changes for typos, etc.  At the command prompt, at the top level of the repository, enter:

   ```
   $> gulp watch
   ...
   [ok]...
   ...
   ```
   (hit ctrl-c to terminate the batch job)
 
   This performs an initial validation of all the `.yaml` files in the `../swagger/paths` directory. Any errors will be displayed.  The command does not return; rather it continues to watch the directory and checks any files which are subsequently changed, until ctrl-c is issued.

   You can also run 
   ```
   $> gulp validate
   ```
   To validate the changes you made in you your yaml. 
    
5. When changes are complete, the JSON bundle files for export to WS02 are created by executing the following at the command prompt:

   ```
   $> gulp build
   ...
   [ok] C:\IFBIDEV\enterpriseapidatamodel\swagger\paths\policies-1.0.0.yaml
   [Creating : ] swagger/bundles/policies-1.0.0.json
   ... 
   $>
   ```
   This should indicate no errors; files are built into `../swagger/bundles`. 

   If you have renamed or removed any yaml in `../swagger/path` Then run 
   ```
   $> gulp clean build
   ...
   $>
   ```
   Which runs the clean task before running the build task. The clean taks deletes all files in the `../swagger/bundles` folder. 
 
## Embedding Examples

Providing example responses is encouraged.  The example response MUST be in the MIME type format(s) which are supported via the `produces` OpenAPI field (type _[string]_).  Note that this property is optionally present at the [Swagger Object](http://swagger.io/specification/#swagger-object-14) and the [Operation Object](http://swagger.io/specification/#operation-object-36) levels.

The example files should be named using this template:

*&lt;contract name&gt;[-&lt;version&gt;][-&lt;operation&gt;]-response.&lt;MIME Type Extension&gt;*

The version and operation may be omitted if not needed. For example:  

*policies-home-1.0.0-get-response.json*  

The files should be housed in the `.../swagger/examples` folder, and an entry made in the .../swagger/definitions.yaml file.  For the file example above, the entry would be:  

    ...
    policies-home-1.0.0-get-response:  
      $ref: './examples/policies-home-v1.0.0-get-response.json'  
    ...

To include the example response in the contract specification such that it will be bundled and usable by the WS02 API Store, include the following (refer to the above example) in the [response object](http://swagger.io/specification/#response-object-58) of the contract specification (indent appropriately; __examples__ should be at the same level as the __description__ and __schema__ objects):  
    
	...  
	examples:  
	  application/json:  
	    $ref: '../definitions.yaml#/definitions/policies-home-1.0.0-get-response'  
	...  
    
## Using Swagger Editor

*Note:*  The Swagger Editor is only used by developers to view the files in the `swagger/paths` directory, to check for format, validation etc.  For use in the enterprise WS02 Store, the files should be processed into the swagger/bundles directory (as JSON files) using the `gulp build` command above.

  1. Use the [online editor](http://editor.swagger.io) or follow 
	   the [installation instructions](http://swagger.io/swagger-editor/).
  2. In the editor, Use **File->Open** and choose the **XXX.yaml** file from the local `../swagger/bundles` directory.

## Swagger Documentation Notes

* All models SHOULD have a `description` element.  Generic models, such as Hash, do not include a `description` as the referencing element SHOULD describe the usasge.
* Properties of with concrete types SHOULD have a description
* Properties which are references to other types (`$ref:`) SHOULD NOT have a description--the editor will use the description from the referenced item specification.  Exception:  Hash.
* Primary id properties should be named `id` and be the first element of the model.  This `id` is a `required:` field.
* When referencing a id of another model, prefix with the model name, i.e. _clientId_ when referring to the id property of the Client model
* Enumerations of strings:  The first letter MUST be capitalized
* Boolean properties:  Should begin with `is`  
* Unless otherwise specified, the use of `format: date` refers to ISO8601 date format:  *CCYY-MM-DD*, example: 1776-07-04.
* In order to accommodate data which is provided in both a coded and a decoded format, such fields should be modeled as &lt;property&gt; and &lt;property>Code; e.g. _addressType_ and _addressTypeCode_

## Naming Conventions
### Model file names (first letter capitalized)
* &lt;Noun&gt;&lt;[Detail]&gt;-&lt;Life | Personal | Commercial&gt;

### JSON Schema files names
* lowercase
* &lt;path name&gt;-[request | repsonse].json  _i.e._ `client-search-request.json`

### Property Names
* Modified camelCase:  first letter lowercase, then camel case
* No Abbreviations unless the abbreviation is `widely` understood:  atm or vin may be used; notice lower case.
