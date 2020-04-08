combo_goo_date_start = null;
generateOnboardingOffboarding = {
   id: 'generateOnboardingOffboarding',
   form_name: 'GenerateOnboardingOffboarding',
   entrypoint: 'scheduleGenerateOnboardingOffboarding',
   relate_field_name: 'employee',
   relate_field_target_module: 'Employees',
   tpl: 'themes/SuiteP/tpls/generateOnboardingOffboarding.tpl',
   popup: null,
   init: function () {
      viewTools.GUI.fieldErrorUnmark();
      if (this.popup) {
         this.popup.init();
         return;
      }
      $.get(this.tpl, function (tpl) {
         this.popup = MintHCMPopup(
            viewTools.language.get('app_strings', 'LBL_GENERATEONBOARDINGOFFBOARDING_POPUP_TITLE'),
            this.getPopupBody(tpl),
            [{
               text: "OK",
               class: "primary",
               click: function () {
                  this.valid(function (employee_id, date_start, parent_id) {
                     this.sendRecords(
                        $('#' + this.form_name + ' #parent_type').val(),
                        parent_id,
                        employee_id,
                        date_start);
                     MintHCMPopup.close();
                  }.bind(this));
               }.bind(this)
            }],
            {},
            this.onPopupShow.bind(this)
         );
      }.bind(this));
   },
   valid: function (callback) {
      let result = true;
      viewTools.GUI.fieldErrorUnmark();
      let employee_field = $('#' + this.form_name + ' #' + this.relate_field_name + '_id');
      let date_start_date = $('#' + this.form_name + ' #goo_date_start_date');
      let parent_id = $('#' + this.form_name + ' #parent_id');
      if (_.isEmpty(employee_field.val())) {
         viewTools.GUI.fieldErrorMark(employee_field, viewTools.language.get('app_strings', 'ERR_MISSING_REQUIRED_FIELDS') + ' ' + viewTools.language.get('app_strings', 'LBL_GENERATEONBOARDINGOFFBOARDING_EMPLOYEE_NAME'));
         result = false;
      }
      if (_.isEmpty(date_start_date.val())) {
         viewTools.GUI.fieldErrorMark(date_start_date, viewTools.language.get('app_strings', 'ERR_MISSING_REQUIRED_FIELDS') + ' ' + viewTools.language.get('app_strings', 'LBL_GENERATEONBOARDINGOFFBOARDING_START_DATE'));
         result = false;
      }
      if (_.isEmpty(parent_id.val())) {
         viewTools.GUI.fieldErrorMark(parent_id, viewTools.language.get('app_strings', 'ERR_MISSING_REQUIRED_FIELDS') + ' ' + viewTools.language.get('app_strings', 'LBL_GENERATEONBOARDINGOFFBOARDING_TEMPLATE'));
         result = false;
      }
      if (result) {
         let date_start = date_start_date.val() + " " + $('#goo_date_start_hours').val() + ":" + $('#goo_date_start_minutes').val();
         if ($('#goo_date_start_meridiem').length === 1) {
            let date_start = date_start + $('#goo_date_start_meridiem').val();
         }
         callback(employee_field.val(), date_start, parent_id.val());
      }
   },
   sendRecords: function (module_name, template_id, employee_id, date_start) {
      let url_ = "index.php?entryPoint=" + this.entrypoint + "&module_name=" + module_name + "&template_id=" + template_id + "&employee_id=" + employee_id + "&date_start=" + date_start;
      $.ajax({
         type: "POST",
         async: true,
         url: url_,
         success: function (data) {
            data = JSON.parse(data);
            if (data === 1) {
               viewTools.GUI.statusBox.showStatus(viewTools.language.get('app_strings', 'LBL_GENERATEONBOARDINGOFFBOARDING_SUCCESS'), 'success', 5000);
            } else {
               this.showErrors(data);
            }
         }.bind(this),
         error: function (jqXHR, exception) {
            viewTools.GUI.statusBox.showStatus(viewTools.language.get('app_strings', 'LBL_GENERATEONBOARDINGOFFBOARDING_ERROR'), 'error', 5000);
         }
      });
   },
   showErrors: function (errors) {
      MintHCMPopup(
         viewTools.language.get('app_strings', 'LBL_GENERATEONBOARDINGOFFBOARDING_ERROR'),
         this.getErrorPopupBody(errors)
      );
   },
   getErrorPopupBody: function (errors) {
      let body = '';
      for (let error in errors) {
         body += '<p>' + viewTools.language.get('app_strings', 'LBL_GENERATEONBOARDINGOFFBOARDING_ERROR_' + error.toUpperCase());
         if (error == 'organizational_unit_manager') {
            body += '</p><ul style="list-style-type:disc;padding-left:30px;">';
            for (let record in errors[error]) {
               body += '<li>' + this.createLinkToModuleRecord(errors[error][record]) + '</li>';
            }
            body += '</ul>';
         } else {
            body += this.createLinkToModuleRecord(errors[error]) + '</p>';
         }
      }
      return body;
   },
   createLinkToModuleRecord: function (record) {
      return '<a style="font-weight: bold;" href="index.php?module=' + record.module + '&action=DetailView&record=' + record.id + '" target="_blank">' + record.name + '</a>';
   },
   getPopupBody: function (tpl) {
      let body = _.template(tpl);
      return '<div id="' + this.id + '" style="overflow: hidden">' + body(Object.assign({}, {
         APP: SUGAR.language.languages.app_strings,
         relate_field_name: this.relate_field_name,
         form_name: this.form_name,
         relate_field_target_module: this.relate_field_target_module,
         parent_type_options: this.getParentTypeOptions(),
      }, this.getPrefillData())) + '</div>';
   },
   getPrefillData: function () {
      let employee_id, employee_name, parent_id, parent_name = '';
      const module = $('input[name=module]:not(.form-control)').val();
      const record_id = $('input[name=record]').val();
      const record_name = $('div[field=name] > span.sugar_field').text().trim();
      switch (module) {
         case 'Employees':
            employee_id = record_id;
            employee_name = record_name;
            break;
         case 'OffboardingTemplates':
         case 'OnboardingTemplates':
            parent_id = record_id;
            parent_name = record_name;
            break;
      }
      return {
         employee_id: employee_id,
         employee_name: employee_name,
         parent_id: parent_id,
         parent_name: parent_name
      }
   },
   getParentTypeOptions: function () {
      let selected = '';
      const module = $('input[name=module]:not(.form-control)').val();
      const templates = viewTools.language.get('app_list_strings', 'template_type_list');
      let options = '';
      for (let module_name in templates) {
         selected = (module_name == module) ? ' selected' : '';
         options += '<option value="' + module_name + '"' + selected + '>' + templates[module_name] + '</option>';
      }
      return options;
   },
   onPopupShow: function () {
      this.prepareSqsObjects();
      this.prepareCalendar();
   },
   prepareSqsObjects: function () {
      sqs_objects = [];
      let relate_field_name = this.relate_field_name + "_name";
      let relate_field_id = this.relate_field_name + "_id";
      sqs_objects[this.form_name + "_" + this.relate_field_name + "_name"] = { form: this.form_name, method: "query", modules: [this.relate_field_target_module], group: "and", field_list: ["name", "id"], populate_list: [relate_field_name, relate_field_id], conditions: [{ "name": "name", "op": "like_custom", "end": "%", "value": "" }], required_list: [relate_field_id], order: "name", limit: "30", no_match_text: "Nie pasuje" };
      sqs_objects[this.form_name + "_parent_name"] = { form: this.form_name, method: "query", modules: ["Accounts"], group: "or", field_list: ["name", "id"], populate_list: ["parent_name", "parent_id"], required_list: ["parent_id"], conditions: [{ "name": "name", "op": "like_custom", "end": "%", "value": "" }], order: "name", limit: "30", no_match_text: "Nie pasuje" };
      enableQS();
      if (typeof (changeParentQS) == 'undefined') {
         let disabledModules = [];
         changeParentQS = function (field) {
            if (typeof sqs_objects == 'undefined') {
               return;
            }
            field = YAHOO.util.Dom.get(field);
            let form = field.form;
            let sqsId = form.id + "_" + field.id;
            let typeField = form.elements.parent_type;
            let new_module = typeField.value;
            if (typeof (QSFieldsArray[sqsId]) != 'undefined') {
               QSFieldsArray[sqsId].sqs.modules = new Array(new_module);
            }
            if (typeof QSProcessedFieldsArray != 'undefined') {
               QSProcessedFieldsArray[sqsId] = false;
            }
            if (sqs_objects[sqsId] == undefined) {
               return;
            }
            sqs_objects[sqsId]["modules"] = new Array(new_module);
            if ((typeof (disabledModules) != 'undefined' && typeof (disabledModules[new_module]) != 'undefined') || "" == "readonly" || "" == "parent_type") {
               sqs_objects[sqsId]["disable"] = true;
               field.readOnly = true;
            } else {
               sqs_objects[sqsId]["disable"] = false;
               field.readOnly = false;
            }
            enableQS(false);
         }
      }
      changeParentQS("parent_name")
   }, 
   prepareCalendar: function () {
      viewTools.api.callCustomApi({
         module: 'Home',
         action: 'getJSCalendarVariables',
         callback: function (data) {
            if (data) {
               [_cal_date_format, _user_date_format, _user_time_format, _calendar_format, _time_separator, _calendar_fdow] = data;
               combo_goo_date_start = new Datetimecombo("", "goo_date_start", _user_time_format, "0", '', false, true, '');
               let text = combo_goo_date_start.html("");
               $('#' + this.form_name + ' #goo_date_start_time_section').html(text);
               eval(combo_goo_date_start.jsscript(""));
               Calendar.setup({
                  onClose: update_goo_date_start,
                  inputField: "goo_date_start_date",
                  form: this.form_name,
                  ifFormat: _calendar_format,
                  daFormat: _calendar_format,
                  button: "goo_date_start_trigger",
                  singleClick: true,
                  step: 1,
                  weekNumbers: false,
                  startWeekday: _calendar_fdow,
                  comboObject: combo_goo_date_start
               });
               combo_goo_date_start.update(false);
            }
         }.bind(this)
      });
   }
};
