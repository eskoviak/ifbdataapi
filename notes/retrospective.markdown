# API Retrospective

This retrospective pertains to the development and current status of the RESTful CARE+ API.

The mission of the CARE+ API team is to develop an API for insurance industry data that can model multiple insurance lines for front-end applications useable by developers who are not insurance industry experts.

Although work on the API started at a good rate, work slowed as the API team gathered more information about the problem domain and began questioning earlier modeling decisions and began reevaluating design assumptions. 

As of this writing development of the API is paused until the team(s) responsible for fulfilling the API and the CARE+ web app team consuming the API gain further experience implementing the portion of the CARE+ web app based on the CARE+ API which has already been designed. 

Major conclusions are mentioned first with details following.

## Major Conclusions

1. The CARE+ API team should be working more closely with the Enterprise Services team because they are facing similar challenges.

2. The sources used for modeling the CARE+ API (Req 2.1, declarations, CARE reviews, SMEs, etc) are not in agreement with one another.

3. We need a change management process.

4. The CARE+ API project needs active project management with stories and tracking in Jira.

## Principals

1. Corinna Cohn (Lead)
2. Greg Davidson (Contributor)
3. Nick Celestin (Contributor)
4. Don Hartley (POINT SME)

Corinna Cohn has experiencing developing RESTful APIs for web applications. Previous APIs had fewer than ten major endpoints and fewer than ten major models. Corinna is a newcomer to the insurance industry.

Greg Davidson is a memeber of the IFB architecture team. He is experienced developing Java APIs and has some experience with the insurance industry.

Nick Celestin is an experienced web developer. He has experience designing APIs for web applications. Nick is a newcomer to the insurance industry.

Don Hartley is a subject matter expert on the POINT administrative system and is an expert on Farm and Commercial policy types.

Overall, the team has experience developing APIs, but the CARE+ is the first API of this wide of a scale.

The team has little experience with the insurance industry. The positive aspect of this is that the team had some freedom to think outside the paradigms of administrative insurance systems, ACORD, and existing service implementations. One result is the creation of a hierarchical general insurance model which successfully accommodated insurance lines for Auto and Homeowners insurance.

One drawback to the team's inexperience with the insurance industry has been the amount of effort necessary to understand the domain being modeled. This inexperience also made it harder to leverage feedback from SMEs as SMEs sometimes had conflicting points of view that the team struggled to resolve.

## Documenting the API

The Open API Initiative specification (formerly called Swagger) was selected for use in documenting the CARE+ API. This was partly due to inertia (work was branched from previous work on the Online Account Manager API specification) and partly due to compatibility with the WSO2 API Gateway product. 

### Challenges implementing WSO2 with Swagger

There are some challenges to using WSO2 API Gateway with Swagger.

1. The CARE+ API specifications are hosted on a file system instead of a web service, therefore WSO2 is unable to resolve references to external Swagger references.

2. There is no Swagger provision for defining the WSO2 context. Therefore Swagger files must be imported individually based on the context. 

3. WSO2 adds custom properties to the Swagger files after they are imported. This makes it more difficult to migrate changes to the Swagger files to WSO2. Migrations must be manually handled.

4. WSO2 does not have an ability to version changes to Swagger specifications it imports and manages.

*Given these challenges we should identify processes for better change management and API documentation*

## Challenges in designing the API

1. Inexperience with insurance industry
    The CARE+ API team deliberately avoided familiarity with the policy administration
    systems and the existing data models in favor of preserving a view for designing
    an API for web developers. This made it more difficult to adapt previous modeling
    decisions as the domain complexity increased.
    
    The process of integrating multiple modeling sources was hampered because the 
    best or most appropriate change was not apparent when sources conflicted. As
    the team grew in experience it was easier to judge which sources were more
    beneficial for influencing the API design.

2. Assumptions made from early learnings did not hold up as the domain grew in complexity
    The API team operates from this assumption:

    _An _insurance policy_ has a _thing_ being covered with one or more risks against which it is _covered__

     a. An insurance policy may have one or more lines associated with it. Every policy has a _premium_ which represents the rolled up amount of its coverages.
     b. Insurance policies have a _thing_ being covered: an auto, a house, equipment, etc. As we learned, some policies don't cover a thing, but cover general risks.
     c. Every insurance policy has _coverages_. A coverage may have limits and deductibles.

     This assumption worked well for Auto and Homeowners, but started to run into trouble as more complicated insurance lines were modelled. 

3. Too many source materials and the source materials are not reliable

  a. Req 2.1
     Req 2.1 contains a variety of fields and information that the new CARE+
     application is intended to display to the user. There is no datatypes
     listed in this document and so further researched is necessary for defining
     the interface of the REST API. 

     The formatting of the Req 2.1 lead to confusion about relationships between
     policy models and implied hierarchies that did not bear out in 
     administrative systems (sometimes due to errors in the Req 2.1 specification).

  b. existing CARE documents
     The team was provided with example CARE review documents. These documents were 
     helpful for creating a sense of the use case for the API, but the only lines 
     of business with CARE templates available were Auto, Homeowners and Annuity. 
     One example CARE review covered Farm, but since there was no Farm-specific
     template, the example we used was shoehorned into the Homeowners template. We
     did not realize this until after we'd spent time trying to extrapolate conclusions
     based on the badly templated CARE review.
     
  c. declarations (decs)
     The team had access to decs for Auto, Homeowners, and Farm. One of the 
     challenges of using the decs was that the decs implemented templates that
     implied the existence of data that could not be found in the administrative
     systems. 

     > NOTE: The declarations helped clarify the need to capture labels used for
     > insurance abbreviations. Right now that information is captured within 
     > templates like declarations and CARE reviews. The information is not reusable
     > in that format and so the work must be repeated each time a new template
     > (like the CARE+ screens) needs to be written.

  d. administrative systems (POINT, Exceed)
     The team tried to accomplish as much work as possible without requiring access 
     to the core policy administration systems. We wanted to avoid biasing the design
     of the client API by knowledge of the underlying data.

     We started referring to the administrative systems after noticing conflicts 
     between representations of data in the decs and the CARE reports. 

     Access to the administrative system answered many questions about policy data
     (particularly knowledge about the datatypes of fields specified in Req 2.1), but
     access to POINT started to raise new questions. Had we modelled `Coverages` 
     correctly? What about `Policy Interests`? Furthermore we found information on
     the decs that were not visible in POINT. 

  e. service/ACORD mapping awareness (eg, coverages, ids, etc)
     We have been mindful about designing a service that can be 
     realisticly mapped to our enterprise services. This means being careful 
     about creating specifications for CARE+ models and routes. Although this
     was straightforward for Auto and Homeowners, it became increasingly difficult
     with Farm and Commercial.

     The ACORD data model had no direct impact on the modeling of CARE+ API, but
     we started to look to it for guidance on modeling `Coverages` once it became
     apparent that coverages contained unexpected complexity.

  f. subject matter experts (SMEs)
     One of the team's first activities when starting the CARE+ API was interviewing
     subject matter experts. The meetings contained one or two experts and were
     focussed on modeling individual lines of business. The SMEs were helpful in
     clarifying items in Req 2.1.

     One thing we learned from the SMEs is that experts working on different lines
     of insurance have different points of view of how insurance works. For example,
     Auto and Homeowners are not packaged policies in the way Farm and Commercial are.

  g. data sources
     The API Team gained access to XML files describing Home and Auto policies.
     These assets created more confusion and did not help inform the design of the
     API, but reaching this conclusion took time and effort.

## Challenges managing production of the CARE+ API

1. Not enough project management
    Work on the CARE+ API started without a plan. Given the existing Online Account 
    Manager API and the CARE+ Req. 2.1 document, the API team started work making 
    adaptations for the CARE+ web application. The team transitioned from research 
    mode to production mode without any deliberate change in approach.

    *We need a plan for finishing the CARE+ API including a schedule of deliverables*

2. No Jira tracking
    Going forward the project needs to be broken into stories and tasks and tracked 
    in Jira, with stakeholders added as watchers to tickets.  

    *We need assistance from an experienced project manager to establish the CARE+ API project in Jira and some mentoring in project management*


3. No procedure for change management
    We have no formal channel for broadcasting changes to CARE+ API. The stakeholders
    who need to know about changes include:

    * CARE+ Web application developers
    * Enterprise Services developers who map properties to the CARE+ API
    * Operator/Manager of the WSO2 API Gateway
    * Any departments or managers who need to be aware of changes
    * Quality Assurance (eventually)

## Lessons learned modeling the API

1. There is no single source of truth.
    Much of the information is in the administrative programs.
    Some of the truth is out-of-band, captured within declarations and CARE+ templates.
    Some of the truth is in the head of SMEs.
    Nobody has the whole picture.

2. ACORD has faced some of these problems.
    The Enterprise Services (ES) team mapping the admin systems to ACORD is facing 
    the same modeling chanllenges as the CARE+ API team. 

    The CARE+ API team should work in the same room as the ES services team while
    both teams are performing domain modeling. 

    1. Both teams are modeling the same type of data even though the intended consumers are different 
    2. The ES team has more experience and insight into modeling insurance data

3. Property and Casualty insurance is a different domain from Life/Annuity
    When Life and Annuity policy lines are modelled for the CARE+ API assumptions about
    P&C models such as `Coverages` and `InsuredItems` will need to be reevaluated. These
    models are fundamental to P&C but are substantially different from Life policies
    and Annuinities.

    Life and Annuities modeling should take inspiration from the work done so far 
    on CARE+ API, but must reconsider the properties of all the fundamental models
    defined so far.

4. Insurance packages (Farm, Commercial) are more challenging to model than insurance lines that only cover one item.

5. Coverages are the most fundamental unit of the insurance model, but it took a long time to finalize the coverage model.
    We initially modeled deductibles and liabilties as being properties of the 
    Coverage model. During our modeling of Homeowners we discovered that some 
    deductibles can apply to multiple Coverages. In response we moved Deductibles
    into a model as a sibling to Coverages.

    Further research confirmed our first impressions and we ended up demoting
    Deductibles to being a property of Coverages. Insurance agents are able to 
    read a policy and understand that one deductible can apply to multiple 
    Coverages _even though this is not clearly represented in any system or
    data model, even ACORD_. This is a good example of how we've been confounded
    in making "right" choices in fundamental insurance models.


