var angularForm;

//############################################################################################################################################
//############################################################################################################################################
//
// FORM COMPONENT
//
// example form field:
//
// <div id="firstNameGroup" class="span3 control-group">
//      <label for="firstName" class="highlight control-label">First name</label>
//      <textinput field="fields.firstName"></textinput>
//      <p id="firstNameError" class="error"></p>
// </div>
//
//
//############################################################################################################################################
//############################################################################################################################################

angularForm = angular.module("angularForm", [])
    .service("angularFormService", ["$http",
        function($http) {
            // reference to service
            // @private
            var __service = this;

            // definition of form fields
            // @public
            this.__fields = {};

            // is form valid (globally)
            this.__valid = false;

            // server url
            this.RESTpoint = "";

            // REST method, default - POST
            this.RESTmethod = "POST";

            // constraintValidation flag
            this.constraintValidation = false;


            // initialization of service
            // callbacks - callbacks for preSend() and postSend()
            // RESTpoint - url, where form fields should be sended
            //
            this.init = function(options) {
                if (typeof options === "object") {
                    if (options.fields) {
                        this.__fields = options.fields;
                    }

                    if (options.preValidate && typeof options.preValidate === "function") {
                        this.preValidate = options.preValidate;
                    }

                    if (options.validateField && typeof options.validateField === "function") {
                        this.validateField = options.validateField;
                    } else {
                        // validateField callback for liveValidation for directives
                        this.validateField = function(field) {
                            var DOMelement = $("#" + field.elementid);
                            var GroupElement = $("#" + field.elementid + "Group");
                            var ErrorElement = $("#" + field.elementid + "Error");

                            GroupElement.removeClass("error").removeClass("success");
                            ErrorElement.attr("disabled", "disabled").html("");

                            if (typeof __service.preValidate === "function") {
                                __service.preValidate(field);
                            }

                            if (field.required === true && (field.model === "" || field.model === false || field.model === null || field.model === undefined)) {
                                GroupElement.addClass("error");
                                if (field.is_empty) {
                                    ErrorElement.html(field.is_empty).removeAttr("disabled");
                                }
                                return "is_empty";
                            }

                            if (field.validationRule && !field.validationRule.test(field.model)) {
                                GroupElement.addClass("error");
                                if (field.is_invalid) {
                                    ErrorElement.html(field.is_invalid).removeAttr("disabled");
                                }
                                return "is_invalid";
                            }


                            GroupElement.addClass("success");
                            return true;
                        };
                    }

                    if (options.preSend && typeof options.preSend === "function") {
                        this.preSend = options.preSend;
                    }

                    if (options.postSend && typeof options.postSend === "function") {
                        this.postSend = options.postSend;
                    }
                    if (options.RESTpoint) {
                        this.RESTpoint = options.RESTpoint;
                    }
                    if (options.constraintValidation) {
                        this.constraintValidation = true;
                    }
                }
            };

            
            // validation of whole form
            this.validation = function() {
                var valid = true;
                for (var f in this.__fields) {
                    var _result = __service.validateField(f);
                    if (_result === "is_empty" || _result === "is_invalid") {
                        valid = false;
                    } // if
                } // for

                __service.__valid = true;
                return valid;
            };


            // if another RESTpoint is needed:
            this.setRestPoint = function(RESTpoint) {
                this.RESTpoint = RESTpoint;
            };

            this.setRestMethod = function(method) {
                this.RESTmethod = method || this.RESTmethod;
            };

            this.setConstraintValidation = function(cv) {
                this.constraintValidation = cv || this.constraintValidation;
            };

            // processing the form
            // calls all callbacks defined
            //
            this.process = function(fields) {
                // sets 'fields' for callbacks
                this.__fields = fields;
                

                this.preSend(this);

                // if constraint validation required, process
                if (this.constraintValidation) {
                    // @TODO constraint validation
                }
                // otherwise, runs regular validation
                this.validation();


                // process form start
                this.send();
                // process form end

                this.postSend(this);
            };

            // 
            this.send = function() {
                // creating JSON to send
                var payload = {};
                for (var __field in this.__fields) {
                    payload[__field] = this.__fields[__field]['model'];
                }

                // send only if this.__valid is true
                if (this.__valid && __service.RESTpoint) {

                    $http({
                        url: __service.RESTpoint,
                        method: __service.RESTmethod,
                        data: payload,
                        headers: {
                            "Content-Type": "application/json; charset=utf-8"
                        }
                    }).then(
                        function(response) {
                            // success!!!
                            console.log("ok");
                        },
                        function(response) {
                            // server made a boo :/
                            console.error("something went really, really wrong... :/");
                        }
                    );
                }
                console.log(payload);
            };
        }
    ])
    .directive("buttons", ["angularFormService",
        function(angularFormService) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    "formfields": "="
                },
                template: '<div><input type="button" class="" style="padding:10px;" name="" formfields="fields" ng-click="process()" value="Send"/></div>',
                controller: function($scope) {
                    $scope.process = function() {
                        angularFormService.process($scope.formfields);
                    };
                }
            };
        }
    ])
    .directive("textinput", ["angularFormService",
        function(angularFormService) {
            return {
                restrict: 'E',
                scope: {
                    "field": "="
                },
                transclude: true,
                template: '<input type="{{field.type}}" class="{{field.cssClass}}"' +
                    'id="{{field.elementid}}" name="{{field.elementname}}" ' +
                    'placeholder="{{field.placeholder}}" ng-required="field.required" ng-model="field.model" ng-disabled="field.disabled"/>',
                replace: true,
                link: function(scope, element, attrs) {
                    if (angularFormService.constraintValidation === true && scope.field.error) {
                        element.setCustomValidity(scope.field.error);
                    }

                    element.bind("blur", function() {
                        angularFormService.validateField(scope.field);
                    });
                } //link
            }; // return
        }
    ])
    .directive("checkboxfield", ["angularFormService",
        function(angularFormService) {
            return {
                restrict: 'E',
                scope: {
                    "field": "="
                },
                replace: true,
                template: '<input type="checkbox" class="{{field.cssClass}}" ' +
                    'id="{{field.elementid}}" name="{{field.elementname}}" ng-model="field.model" ng-disabled="field.disabled"/>',
                link: function(scope, element, attrs) {
                    if (angularFormService.constraintValidation === true && scope.field.error) {
                        element.setCustomValidity(scope.field.error);
                    }

                    element.bind("click", function() {
                        CPAFormComponentService.validateField(scope.field);
                    });

                    element.bind("blur", function() {
                        angularFormService.validateField(scope.field);
                    });
                } //link
            };
        }
    ])
    .directive("selectlist", ["angularFormService",
        function(angularFormService) {
            return {
                restrict: 'E',
                scope: {
                    "field": "="
                },
                transclude: true,
                template: '<select id="{{field.elementid}}" class="{{field.cssClass}}" name="{{field.elementname}}"' +
                    ' ng-model="field.model" ng-disabled="field.disabled">' +
                    '<option value=""> choose:</option>' +
                    '<option ng-repeat="opt in field.options track by $index" value="{{opt.key}}" ng-selected="field.model == opt.key">{{opt.name}}</option>' +
                    '</select>',
                replace: true,
                link: function(scope, element, attrs) {
                    if (angularFormService.constraintValidation === true && scope.field.error) {
                        element.setCustomValidity(scope.field.error);
                    }

                    element.bind("blur", function() {
                        angularFormService.validateField(scope.field);
                    });
                } //link
            };
        }
    ]);