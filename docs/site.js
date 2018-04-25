(function () {
    "use strict";

    let baseSourceUrl;

    function populateLanguages(container, languages) {
        if (!languages || !languages.length) return;

        languages.forEach(languageItem => {
            let languageGroup = document.createElement("div");
            languageGroup.className = "language-group";
            let languageTitle = document.createElement("div");
            languageTitle.className = "language-title";
            if (languageItem.link) {
                let languageLink = document.createElement("a");
                languageLink.href = baseSourceUrl + languageItem.link;
                languageLink.target = "_blank";
                languageLink.innerText = languageItem.name;
                if (languageItem.ide) {
                    languageTitle.title = languageItem.ide;
                }
                languageTitle.appendChild(languageLink);
            } else {
                languageTitle.innerText = languageItem.name;
            }
            languageGroup.appendChild(languageTitle);

            container.appendChild(languageGroup);
        });
    }

    function populateRuntimes(container, runtimes) {
        if (!runtimes || !runtimes.length) return;

        runtimes.forEach(runtimeItem => {
            let runtimeGroup = document.createElement("div");
            runtimeGroup.className = "runtime-group";
            let runtimeTitle = document.createElement("div");
            runtimeTitle.className = "runtime-title";
            runtimeTitle.innerText = runtimeItem.name;
            runtimeGroup.appendChild(runtimeTitle);

            populateLanguages(runtimeGroup, runtimeItem.languages)

            container.appendChild(runtimeGroup);
        });
    }

    function populateIntefaces(container, interfaces) {
        if (!interfaces || !interfaces.length) return;

        interfaces.forEach(interfaceItem => {

            let interfaceGroup = document.createElement("div");
            interfaceGroup.className = "interface-group";
            let interfaceTitle = document.createElement("div");
            interfaceTitle.className = "interface-title";
            interfaceTitle.innerText = interfaceItem.name;
            interfaceGroup.appendChild(interfaceTitle);

            populateRuntimes(interfaceGroup, interfaceItem.runtimes);

            container.appendChild(interfaceGroup);
        });
    }

    function populateList(data) {
        baseSourceUrl = data.baseSourceUrl;
        populateIntefaces(document.querySelector("div#intefaceContainer"), data.interfaces);
    }

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            populateList(this.response);
        }
    };
    xhttp.responseType = 'json';
    xhttp.open("GET", "data.json", true);
    xhttp.send();
})();