
# 2016-04-04

Idea: Coverages get new property CoverageDetails (schemaless?)

Arising from discussion of Non-Ownership Liability under Commercial Auto

InsuredItem
  itemType: CommercialAutoNonOwnershipLiability
  itemDetails: [
    { 
      name: "Other than a Social Service Agency"
      ratingBasis: "Number of Employees",        
      number: 5, 
      premium: 104.21 
    }
  ]
  




## Commercial

* General

  * Lots of Commercial policies have a "Schedule". What is this for?

* CAP

  * What is Named Insured from POINT?
  * What is a "Schedule of Covered Automobiles"?
  * What is "Schedule of Hired or Borrowed"?
  * What is "Schedule for Non-Ownership of Liability"?

* Commercial Umbrella
 
  * Review "Limit of Insurance"
  * Schedule of Underlying Requirements?

* Church

  * (cac) Not actually multiple lines of business, but will be modelled as multiple for API
  * Auto?
  * Automatic Increase Real Property
  * What are Options (Item 7)

* Workers Compensation

  * What is "Classification of Operations?"
  * What are Premium Adjustments? 

* Commerical Package

  * What's the difference between this and Commercial Auto Policy?

  * Commercial Property

    * Description of premises

    * Description of Coverage
      
      * Are these just coverages?

  * General limits of liability

  * Builder's Risk

  * Inland Marine

  * Crime

* Business Owner's (BOP)

  * Description of premises again.






# 2016-03-31

## Questions for Friday


### Auto

* Auto: will Rated Driver discounts be represented at the InsuredItem level or at the Driver level?


### Farm

* Miscellaneous Class Items
    * Farm Dwelling Coverage, Farm Machinery (breakdown), Blanket Peak Season...  how are these be modeled? 


#### Farm Location



### Cross Cutting

* Will premiums appear for each coverage/insured item or do we just sum them at
the insurance line or policy level?

* Can a coverage have both a deductible and a limit? (ie, Inland Marine)

* What's the difference between premium and net premium

* Limit, liability limit, limit of liability, limit of insurance. 

* For Insurance Line items (eg, Farm Umbrella) how is the client policy
interest represented in the system?

# 2016-03-28

## Client Questions

* Client to Client
  * What is the relationship? What are the properties?
  * Can we store "Relationship Client Account" in the ClientAccount model? Hopefully yes.

* Policy View (top of pyramid)
  * What can we do to make the policy description field useful at a summary level?

* Deductibles / Coverages -- at what level should they be?

* Has there been any resolution on the point/surcharge topic? The req 2.1 doc hasn't changed. I believe we decided to only model points. 

* Valet Level....


Notes:
  Persons
    Brenda: requirement document
    Zack: requirement document
    Chistine: Manager over CARE+ and more
  Product Owners: Zack and Mindy
  Client:
    SMEs: Christi[(an)|(ne)]
  PolicyTypes:
    - Auto
      SMEs: *Wendy* and Ryan
    - Homeowners
      SMEs: Wendy and Ryan
    - Farm
      SMEs: Don Hartley, Bev Hinn
    - Commercial
      SMEs: Don Hartley, Bev Hinn
    - Life
      SMEs: Wayne or Lea Leighton
    - Annuity
      SMEs: Wayne
    - Rural
      SMEs: Chris Coffin

Ask Mindy:
  * Rating symbols were not defined in the specification. Was this an oversight or a deliberate choice.
  * Vehicle Use and Miles to Work also missing.
  * Household Exposures: Is the limit necessary

Ask Mike Brown:
  * The spec document is changing. How can we store this so we can collaborate?


Insurance Line - auto, dwelling, inland marine, liability, structure, property
Unit/Location - farm compound, dwelling, vehicle
Item - watch
Land/Location - attaches to policy directly, most claims are filed under liability


