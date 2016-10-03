# Model Structure

## Policy
![Policy/{policyId}/]  (./images/Policy-Top.png)
<p>This represents the entry point for the policy inquiry.  The Policy object contains the fields that are mostly common across all insurance lines.</p>
![Policy]  (./images/Policy.png)
<p>The Policy model contains a property `policyDetails,` which is a _reference_ to an object which is one of:</p>

* PolicyDetail-Commericial
* PolicyDetail-Life
* PolicyDetail-Personal

### Commercial Policy
![Policy/{policyId}/]  (./images/Commercial%20Policy%20Sructure.png)
<p>The Commercial Policy Structure encompasses several insurance lines (`lines`):  Farm, Rural, Umbrella, and Commericial Real Estate, and therefor is the only model structure which allows more than one `policyDetail` object.</p>
### Life Policy
![Policy/{policyId}/]  (./images/Life%20Policy%20Structure.png)
<p>The Life Policy struture models the life and annuity policy structure.  Unlike the commericaial insurance lines, there is only one PolicyDetail.