<#import "/templates/system/common/crafter.ftl" as crafter />

<@crafter.componentRootTag $tag="div" class="">
	<#assign formId = contentModel.objectId?replace('-','') />
	<form>
      <h3>${contentModel.headline_s}</h3>
      <#if contentModel.controls_o?? && contentModel.controls_o.item??>
      <#list contentModel.controls_o.item as field>
  

        	<label>${field.label_s} 
          <#if field.required_b=true><span class='required'>*</span></#if>


                <#if field.type_s=="Input">
                  <input type='text' id='${formId}-${field.label_s}' value='${field.defaultValue_s!""}' /> 
            	<#elseif field.type_s=="Text Area">
                  <textarea type='text' id='${formId}-${field.label_s}'>${field.defaultValue_s!""}'</textarea>
            	<#elseif field.type=="Boolean">
                 <input type='checkbox' id='${formId}-${field.label_s}' <#if field.defaultValue_s?? && field.defaultValue_s=="true">checked='true'</#if> />
            	</#if>
            </label>

        </#list>
        </#if>
         <button type="${formId}sumbit" onclick='return ${formId}submit();'>${submitButtonLabel!"Submit"}</button>
      </form>

	<div class="modal fade ${formId}Dialog" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" style="display:none">
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
          ${contentModel.result!"Submitted"}
        </div>
      </div>
    </div>

         <script>
         	function ${formId}submit() {
            	var values = [];
                values[0] = "${contentModel.storeUrl}";

                <#if contentModel.controls_o?? && contentModel.controls_o.item??>

                <#list contentModel.controls_o.item as field>
        			values[${field_index}+1] = { label: "${field.label_s}", value: document.getElementById("${formId}-${field.label_s}") };
				      </#list>
              </#if>

                  $.ajax({
                  	type: "POST",
                    url: "/api/1/services/forms/submit-form.json",
                    data: values,
                  	success: function(data) {
                    	<#if contentModel.onSubmitAction??>
                          <#if contentModel.onSubmitAction == "Redirect">
                              document.location = "${contentModel.result}";
                          <#elseif contentModel.onSubmitAction == "Display Message">
                        	$('#${formId}Dialog').modal("true");

                          </#if>
                        <#else>
                        	$('#${formId}Dialog').modal({ show: 'true' });
                        </#if>
					},
                    failure: function() {
                    }
				  });

                return false;
            }
    </script>
</@crafter.componentRootTag> 