function parseCSVData(file) {
    $.ajax({
        url: file,
        async: false,
        success: function (csvd) {
            data = $.csv.toArrays(csvd);

            var x = document.getElementById("tb");

            for (var i = 1; i < data.length; i++) {
                var tr = document.createElement("TR");
                for (var j = 0; j < 3; j++) {
                    var d = document.createElement("TD");
                    var a = document.createElement("A");
                    if (j == 0) {
                        a.innerText = i;
                    }
                    else if(j == 1) {
                        a.innerText = data[i][6];
                        a.href = "localhost";
                    }
                    else {
                        var s = data[i][10] + " " + data[i][11];
                        a.innerText = s;
                        a.href = "localhost";
                    }
                    d.appendChild(a);
                    tr.appendChild(d);
                }
                x.appendChild(tr);
            }
            
        },
        dataType: "text",
        complete: function () {
            
        }
    });
}

//parseCSVData("data.csv");