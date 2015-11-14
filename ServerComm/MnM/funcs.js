function parseJson(rawResponse) {
    return rawResponse.json();
}


function testServer(){
    alert("Testing server!");
    $.ajax({
        // TODO!!
        url: "http://193.157.250.39:8082/api/messageConversations",
        beforeSend: function(xhr) {
          xhr.setRequestHeader("Authorization", "Basic " + btoa("admin:district"));
        },
        type: 'POST',
        dataType: 'xml',
        contentType: 'application/xml',
        processData: false,
        data: '<message xmlns="http://dhis2.org/schema/dxf/2.0"><subject>Mortality data reporting</subject><text>Have you reported data for the Mortality data set for January 2014?</text><users><user id="bOH4yLSyZQq" /></users></message>',
        success: function (data) {
          alert(JSON.stringify(data));
        },
        error: function(data){
          console.log(data);
        }
    });
}

function getManifestPropertiesPairs(manifest) {
    return getObjectPropertyPairs(manifest);
}

function getObjectPropertyPairs (object) {
    return Object.keys(object)
        .map(function (key) {
            return {
                key: key,
                value: object[key]
            };
        });
}

function renderKeyValueObject(valueObject) {
    // This stuff is very XSS vulnerable (don't use something like this in your real applications :))
    return [
        '<li class="collection-item">',
            '<div class="row">',
                '<div class="key">' + valueObject.key + '</div>',
                '<div class="value">',
                    isObject(valueObject.value) ? createHtmlStructure(valueObject.value) : valueObject.value,
                '</div>',
            '</div>',
        '</li>',
    ].join('');
}

function wrapInCollection(collectionElements) {
    return ['<ul class="collection">', collectionElements.join('') , '</ul>'].join('');
}

function createHtmlStructure(valueObject) {
    return wrapInCollection(getObjectPropertyPairs(valueObject).map(renderKeyValueObject));
}

function isObject(valueToTest) {
    return typeof valueToTest === 'object';
}

function renderToDocument(htmlString) {
    var appElement = document.querySelector('#app');


    appElement.innerHTML = '';
    appElement.appendChild(fragmentFromString(htmlString));
}

function fragmentFromString(strHTML) {
    return document.createRange().createContextualFragment(strHTML);
}

function listenToKeyEvent(element, callback) {
    var value;
    var timeoutIsSet;
    element.addEventListener('keyup', function (event) {
        value = event.target.value;
        if (timeoutIsSet) {
            return;
        } else {
            timeoutIsSet = true;
            setTimeout(function() {
                callback(value);
                timeoutIsSet = false;
            }, 1000);
        }
    });
}

function renderErrorToDocument(error) {
    renderToDocument('Not a correct API URL or not a JSON response');
}

function getBaseUrlFromManifest(manifest) {
    return manifest.activities.dhis.href;
}
