#Model Level (shown in order of precedence):
##x-used-by: :== enum[ <swagger>, ... ]
* Indicates which files include this model
##x-acord-agg-xref: :== string
* The ACORD aggregate (xPath) which this represents or is based on.
* For LAH, the xPath should begin at OLifE.
* for PCS, the xpath should begin with the Base Type
* When there are multiple cross-references, they should be indicated by `#[{(LAH)|(PCS)}| ]`, _i.e._ '#LAH' : 'OLifE.xxx'

#Property Level:
##x-required-in :== enum[ (<swagger>, ... | 'all')]
* Used to indicate the property is required in a specific usage
##x-acord-xref: :== [ string | null ]
*The ACORD property (xPath) which this represents or is based on.  For LAH, the xPath should begin at OLifE.  If
the model has an **x-acord-agg-xref** proerty, the `#[9..9| ].` notation can be used to note the top level option
##x-acord-type-code: :== [ string ]
* The ACORD Type Code list which this property is based on (from a business concept).
* It does not constrain the item to using the typecode, just relating the model element to the ACORD standard.
* The applicable standard can be derived from the name, _i.e._ `OLI_LU...` is from the LAH standard.
