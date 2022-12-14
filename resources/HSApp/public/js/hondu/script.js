document.addEventListener("DOMContentLoaded", ()=> {
    let t=null;
    if(t=document.getElementById("sortable-style-1"), t) {
        Sortable.create(t, {
            animation: 150
        }
        )
    }
    if(t=document.getElementById("sortable-style-2"), t) {
        Sortable.create(t, {
            handle: ".handle", animation:150
        }
        )
    }
    if(t=document.getElementById("sortable-style-3"), t) {
        Sortable.create(t, {
            animation: 150
        }
        )
    }
    const e=document.getElementById("ckeditor");
    e&&ClassicEditor.create(e);
    const o=document.getElementById("carousel-style-1");
    o&&new Glide(o, {
        type:"carousel", perView:4, gap:20, breakpoints: {
            640: {
                perView: 1
            }
            , 768: {
                perView: 2
            }
        }
    }
    ).mount()
}

);
const on=(t, e, o, a)=> {
    const r=document.querySelectorAll(t);
    for(element of r)element.addEventListener(e, t=> {
        t.target.closest(o)&&a(t)
    }
    )
}

,
animateCSS=(t, e, o="animate__")=>new Promise((a, r)=> {
    const i=`$ {
        o
    }
    $ {
        e
    }
    `, n=t;
    n.classList.add(o+"animated", o+"faster", i);
    n.addEventListener("animationend", t=> {
        t.stopPropagation(), n.classList.remove(o+"animated", o+"faster", i), a("Animation Ended.")
    }
    , {
        once:  !0
    }
    )
}

);
let viewportWidth;
const setViewportWidth=()=> {
    viewportWidth=window.innerWidth||document.documentElement.clientWidth
}

,
watchWidth=()=> {
    const t=document.querySelector(".menu-bar");
    if(viewportWidth<640) {
        if( !t)return;
        t.querySelector(".menu-detail.open")||(t.classList.add("menu-hidden"), document.documentElement.classList.add("menu-hidden"), t.querySelectorAll(".menu-detail.open").forEach(e=> {
            hideOverlay(), t.classList.contains("menu-wide")||e.classList.remove("open")
        }
        ))
    }
    if(viewportWidth>640) {
        if( !t)return;
        t.classList.remove("menu-hidden"),
        document.documentElement.classList.remove("menu-hidden")
    }
    viewportWidth>1024&&(()=> {
        const t=document.querySelector(".sidebar");
        t&&t.classList.contains("open")&&(t.classList.remove("open"), hideOverlay())
    }
    )()
}

;
setViewportWidth(),
watchWidth(),
window.addEventListener("resize", ()=> {
    setViewportWidth(), watchWidth()
}

,  !1);
const openCollapse=(t, e)=> {
    t.style.transitionProperty="height, opacity",
    t.style.transitionDuration="200ms",
    t.style.transitionTimingFunction="ease-in-out",
    setTimeout(()=> {
        t.style.height=t.scrollHeight+"px", t.style.opacity=1
    }
    , 200),
    t.addEventListener("transitionend", ()=> {
        t.classList.add("open"), t.style.removeProperty("height"), t.style.removeProperty("opacity"), t.style.removeProperty("transition-property"), t.style.removeProperty("transition-duration"), t.style.removeProperty("transition-timing-function"), "function"==typeof e&&e()
    }
    , {
        once:  !0
    }
    )
}

,
closeCollapse=(t, e)=> {
    t.style.overflowY="hidden",
    t.style.height=t.scrollHeight+"px",
    t.style.transitionProperty="height, opacity",
    t.style.transitionDuration="200ms",
    t.style.transitionTimingFunction="ease-in-out",
    setTimeout(()=> {
        t.style.height=0, t.style.opacity=0
    }
    , 200),
    t.addEventListener("transitionend", ()=> {
        t.classList.remove("open"), t.style.removeProperty("overflow-y"), t.style.removeProperty("height"), t.style.removeProperty("opacity"), t.style.removeProperty("transition-property"), t.style.removeProperty("transition-duration"), t.style.removeProperty("transition-timing-function"), "function"==typeof e&&e()
    }
    , {
        once:  !0
    }
    )
}

,
alerts=()=> {
    on(".alert", "click", '[data-dismiss="alert"]', t=> {
        (t=> {
            t.style.overflowY="hidden", t.style.height=t.offsetHeight+"px", animateCSS(t, "fadeOut").then(()=> {
                t.style.transitionProperty="height, margin, padding, border, opacity", t.style.transitionDuration="200ms", t.style.transitionTimingFunction="linear", t.style.opacity=0, t.style.height=0, t.style.marginTop=0, t.style.marginBottom=0, t.style.paddingTop=0, t.style.paddingBottom=0, t.style.border=0
            }
            ), t.addEventListener("transitionend", ()=> {
                t.parentNode&&t.parentNode.removeChild(t)
            }
            , {
                once:  !0
            }
            )
        }
        )(t.target.closest(".alert"))
    }
    )
}

;
alerts();
const cards=()=> {
    on("body", "click", '[data-toggle="cardSelection"]', t=> {
        (t=> {
            t.target.closest(".card").classList.toggle("card_selected")
        }
        )(t)
    }
    );
    on("body", "click", '[data-toggle="rowSelection"]', t=> {
        (t=> {
            t.target.closest("tr").classList.toggle("row_selected")
        }
        )(t)
    }
    )
}

;
if(cards(), "undefined" !=typeof Chart) {
    Chart.defaults.color="#555555",
    Chart.defaults.font.family="'Nunito Sans', sans-serif";
    class t extends Chart.elements.LineElement {
        draw(t) {
            const e=t.stroke;
            t.stroke=function() {
                t.save(),
                t.shadowColor="rgba(0, 0, 0, 0.25)",
                t.shadowBlur=8,
                t.shadowOffsetX=0,
                t.shadowOffsetY=4,
                e.apply(this, arguments),
                t.restore()
            }
            ,
            Chart.elements.LineElement.prototype.draw.apply(this, arguments)
        }
    }
    t.id="lineWithShadowElement",
    Chart.register(t);
    class e extends Chart.controllers.line {}
    e.id="lineWithShadow",
    e.defaults= {
        datasetElementType: "lineWithShadowElement"
    }
    ,
    Chart.register(e);
    class o extends Chart.controllers.bar {
        draw(t) {
            const e=this.chart.ctx;
            Chart.controllers.bar.prototype.draw.call(this, t),
            e.save(),
            e.shadowColor="rgba(0, 0, 0, 0.25)",
            e.shadowBlur=8,
            e.shadowOffsetX=0,
            e.shadowOffsetY=4,
            Chart.controllers.bar.prototype.draw.apply(this, arguments),
            e.restore()
        }
    }
    o.id="barWithShadow",
    Chart.register(o);
    class a extends Chart.controllers.pie {}
    a.id="pieWithShadow",
    a.defaults= {
        datasetElementType: "lineWithShadowElement"
    }
    ,
    Chart.register(a);
    class r extends Chart.controllers.doughnut {}
    r.id="doughnutWithShadow",
    r.defaults= {
        datasetElementType: "lineWithShadowElement"
    }
    ,
    Chart.register(r);
    class i extends Chart.controllers.radar {}
    i.id="radarWithShadow",
    i.defaults= {
        datasetElementType: "lineWithShadowElement"
    }
    ,
    Chart.register(i);
    class n extends Chart.controllers.polarArea {}
    n.id="polarAreaWithShadow",
    n.defaults= {
        datasetElementType: "lineWithShadowElement"
    }
    ,
    Chart.register(n);
    class s extends Chart.controllers.line {
        draw(t) {
            const e=this.chart.ctx;
            if(Chart.controllers.line.prototype.draw.call(this, t), this.chart.tooltip._active&&this.chart.tooltip._active.length) {
                const t=this.chart.tooltip._active[0].element.x,
                o=this.chart.scales.y.top,
                a=this.chart.scales.y.bottom;
                e.save(),
                e.beginPath(),
                e.moveTo(t, o),
                e.lineTo(t, a),
                e.lineWidth=1,
                e.strokeStyle="rgba(0, 0, 0, 0.1)",
                e.stroke(),
                e.restore()
            }
        }
    }
    s.id="lineWithAnnotation",
    Chart.register(s);
    class d extends Chart.controllers.line {
        draw(t) {
            const e=this.chart.ctx;
            if(Chart.controllers.line.prototype.draw.call(this, t), this.chart.tooltip._active&&this.chart.tooltip._active.length) {
                const t=this.chart.tooltip._active[0].element.x,
                o=this.chart.scales.y.top,
                a=this.chart.scales.y.bottom;
                e.save(),
                e.beginPath(),
                e.moveTo(t, o),
                e.lineTo(t, a),
                e.lineWidth=1,
                e.strokeStyle="rgba(0, 0, 0, 0.1)",
                e.stroke(),
                e.restore()
            }
        }
    }
    d.id="lineWithAnnotationAndShadow",
    d.defaults= {
        datasetElementType: "lineWithShadowElement"
    }
    ,
    Chart.register(d)
}

const collapse=()=> {
    const t='[data-toggle="collapse"]';
    on("body", "click", t, e=> {
        (e=> {
            e.classList.toggle("active");
            document.querySelectorAll(e.dataset.target).forEach(t=> {
                t.classList.contains("open")?closeCollapse(t): openCollapse(t)
            }
            );
            const o=e.closest(".accordion");
            if(o) {
                o.querySelectorAll(t).forEach(t=> {
                    t !==e&&t.classList.remove("active")
                }
                );
                o.querySelectorAll(".collapse").forEach(t=> {
                    t.classList.contains("open")&&closeCollapse(t)
                }
                )
            }
        }
        )(e.target.closest(t))
    }
    )
}

;
collapse();
const darkMode=()=> {
    const t=document.documentElement,
    e=localStorage.getItem("scheme"),
    o=document.getElementById("darkModeToggler");
    if(e&&t.classList.add(e),  !o)return;
    "dark"===e&&(o.checked="checked");
    o.addEventListener("change", ()=> {
        t.classList.contains("dark")?(t.classList.remove("dark"), t.classList.add("light"), localStorage.removeItem("scheme")): (t.classList.remove("light"), t.classList.add("dark"), localStorage.setItem("scheme", "dark"))
    }
    )
}

;
if(darkMode(), "undefined" !=typeof Chart) {
    let t= {
        primary: "20, 83, 136"
    }
    ;
    const e= {
        backgroundColor: "#ffffff", borderColor:"#dddddd", borderWidth:.5, bodyColor:"#555555", bodySpacing:8, cornerRadius:4, padding:16, titleColor:"rgba("+t.primary+")"
    }
    ;
    let o="";
    if(o=document.getElementById("visitorsChart"), o) {
        o=o.getContext("2d");
        let a=o.createLinearGradient(0, 0, 0, 450);
        a.addColorStop(0, "rgba("+t.primary+", .5)"),
        a.addColorStop(.75, "rgba("+t.primary+", 0)"),
        new Chart(o, {
            type:"lineWithShadow", data: {
                labels:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], datasets:[ {
                    data: [6.25, 7.5, 10, 7.5, 10, 12.5, 10, 12.5, 10, 12.5, 15, 16.25], backgroundColor:"rgba("+t.primary+", .1)", borderColor:"rgba("+t.primary+")", borderWidth:2, fill: !0, pointBackgroundColor:"#ffffff", pointBorderColor:"rgba("+t.primary+")", pointBorderWidth:2, pointRadius:4, pointHoverBackgroundColor:"rgba("+t.primary+")", pointHoverBorderColor:"#ffffff", pointHoverBorderWidth:2, pointHoverRadius:6, tension:.5
                }
                ]
            }
            , options: {
                plugins: {
                    legend: {
                        display:  !1
                    }
                    , tooltip:e
                }
                , scales: {
                    y: {
                        grid: {
                            display:  !0, drawBorder: !1
                        }
                        , min:0, max:20, ticks: {
                            stepSize: 5
                        }
                    }
                    , x: {
                        grid: {
                            display:  !1
                        }
                    }
                }
            }
        }
        )
    }
    o=document.getElementById("categoriesChart"),
    o&&(o.getContext("2d"), new Chart(o, {
        type:"polarAreaWithShadow", data: {
            labels:["Potatoes", "Tomatoes", "Onions"], datasets:[ {
                data: [25, 10, 15], backgroundColor:["rgba("+t.primary+", .1)", "rgba("+t.primary+", .5)", "rgba("+t.primary+", .25)"], borderColor:"rgba("+t.primary+")", borderWidth:2
            }
            ]
        }
        , options: {
            maintainAspectRatio: !1, plugins: {
                legend: {
                    position:"bottom", labels: {
                        usePointStyle:  !0, padding:20
                    }
                }
                , tooltip:e
            }
            , scales: {
                r: {
                    ticks: {
                        display:  !1
                    }
                }
            }
            , layout: {
                padding: 5
            }
        }
    }
    )),
    o=document.getElementById("areaChart"),
    o&&(o.getContext("2d"), new Chart(o, {
        type:"line", data: {
            labels:["January", "February", "March", "April", "May", "June"], datasets:[ {
                data: [5, 10, 15, 10, 15, 10], backgroundColor:"rgba("+t.primary+", .1)", borderColor:"rgba("+t.primary+")", borderWidth:2, fill: !0, pointBackgroundColor:"#ffffff", pointBorderColor:"rgba("+t.primary+")", pointBorderWidth:2, pointRadius:4, pointHoverBackgroundColor:"rgba("+t.primary+")", pointHoverBorderColor:"#ffffff", pointHoverBorderWidth:2, pointHoverRadius:6, tension:.5
            }
            ]
        }
        , options: {
            plugins: {
                legend: {
                    display:  !1
                }
                , tooltip:e
            }
            , scales: {
                y: {
                    grid: {
                        display:  !0, drawBorder: !1
                    }
                    , min:0, max:20, ticks: {
                        stepSize: 5
                    }
                }
                , x: {
                    grid: {
                        display:  !1
                    }
                }
            }
        }
    }
    )),
    o=document.getElementById("areaChartWithShadow"),
    o&&(o.getContext("2d"), new Chart(o, {
        type:"lineWithShadow", data: {
            labels:["January", "February", "March", "April", "May", "June"], datasets:[ {
                data: [5, 10, 15, 10, 15, 10], backgroundColor:"rgba("+t.primary+", .1)", borderColor:"rgba("+t.primary+")", borderWidth:2, fill: !0, pointBackgroundColor:"#ffffff", pointBorderColor:"rgba("+t.primary+")", pointBorderWidth:2, pointRadius:4, pointHoverBackgroundColor:"rgba("+t.primary+")", pointHoverBorderColor:"#ffffff", pointHoverBorderWidth:2, pointHoverRadius:6, tension:.5
            }
            ]
        }
        , options: {
            plugins: {
                legend: {
                    display:  !1
                }
                , tooltip:e
            }
            , scales: {
                y: {
                    grid: {
                        display:  !0, drawBorder: !1
                    }
                    , min:0, max:20, ticks: {
                        stepSize: 5
                    }
                }
                , x: {
                    grid: {
                        display:  !1
                    }
                }
            }
        }
    }
    )),
    o=document.getElementById("barChart"),
    o&&(o.getContext("2d"), new Chart(o, {
        type:"bar", data: {
            labels:["January", "February", "March", "April", "May", "June"], datasets:[ {
                label: "Potatoes", data:[5, 10, 15, 10, 15, 10], backgroundColor:"rgba("+t.primary+", .1)", borderColor:"rgba("+t.primary+")", borderWidth:2
            }
            , {
                label: "Tomatoes", data:[7.5, 10, 17.5, 15, 12.5, 5], backgroundColor:"rgba("+t.primary+", .5)", borderColor:"rgba("+t.primary+")", borderWidth:2
            }
            ]
        }
        , options: {
            plugins: {
                legend: {
                    position:"bottom", labels: {
                        usePointStyle:  !0, padding:20
                    }
                }
                , tooltip:e
            }
            , scales: {
                y: {
                    grid: {
                        display:  !0, drawBorder: !1
                    }
                    , min:0, max:20, ticks: {
                        stepSize: 5
                    }
                }
                , x: {
                    grid: {
                        display:  !1
                    }
                }
            }
        }
    }
    )),
    o=document.getElementById("barChartWithShadow"),
    o&&(o.getContext("2d"), new Chart(o, {
        type:"barWithShadow", data: {
            labels:["January", "February", "March", "April", "May", "June"], datasets:[ {
                label: "Potatoes", data:[5, 10, 15, 10, 15, 10], backgroundColor:"rgba("+t.primary+", .1)", borderColor:"rgba("+t.primary+")", borderWidth:2
            }
            , {
                label: "Tomatoes", data:[7.5, 10, 17.5, 15, 12.5, 5], backgroundColor:"rgba("+t.primary+", .5)", borderColor:"rgba("+t.primary+")", borderWidth:2
            }
            ]
        }
        , options: {
            plugins: {
                legend: {
                    position:"bottom", labels: {
                        usePointStyle:  !0, padding:20
                    }
                }
                , tooltip:e
            }
            , scales: {
                y: {
                    grid: {
                        display:  !0, drawBorder: !1
                    }
                    , min:0, max:20, ticks: {
                        stepSize: 5
                    }
                }
                , x: {
                    grid: {
                        display:  !1
                    }
                }
            }
        }
    }
    )),
    o=document.getElementById("lineChart"),
    o&&(o.getContext("2d"), new Chart(o, {
        type:"line", data: {
            labels:["January", "February", "March", "April", "May", "June"], datasets:[ {
                data: [5, 10, 15, 10, 15, 10], borderColor:"rgba("+t.primary+")", borderWidth:2, pointBackgroundColor:"#ffffff", pointBorderColor:"rgba("+t.primary+")", pointBorderWidth:2, pointRadius:6, pointHoverBackgroundColor:"rgba("+t.primary+")", pointHoverBorderColor:"#ffffff", pointHoverRadius:8, pointHoverBorderWidth:2, tension:.5
            }
            ]
        }
        , options: {
            plugins: {
                legend: {
                    display:  !1
                }
                , tooltip:e
            }
            , scales: {
                y: {
                    grid: {
                        display:  !0, drawBorder: !1
                    }
                    , min:0, max:20, ticks: {
                        stepSize: 5
                    }
                }
                , x: {
                    grid: {
                        display:  !1
                    }
                }
            }
        }
    }
    )),
    o=document.getElementById("lineChartWithShadow"),
    o&&(o.getContext("2d"), new Chart(o, {
        type:"lineWithShadow", data: {
            labels:["January", "February", "March", "April", "May", "June"], datasets:[ {
                data: [5, 10, 15, 10, 15, 10], borderColor:"rgba("+t.primary+")", borderWidth:2, pointBackgroundColor:"#ffffff", pointBorderColor:"rgba("+t.primary+")", pointBorderWidth:2, pointRadius:6, pointHoverBackgroundColor:"rgba("+t.primary+")", pointHoverBorderColor:"#ffffff", pointHoverRadius:8, pointHoverBorderWidth:2, tension:.5
            }
            ]
        }
        , options: {
            plugins: {
                legend: {
                    display:  !1
                }
                , tooltip:e
            }
            , scales: {
                y: {
                    grid: {
                        display:  !0, drawBorder: !1
                    }
                    , min:0, max:20, ticks: {
                        stepSize: 5
                    }
                }
                , x: {
                    grid: {
                        display:  !1
                    }
                }
            }
        }
    }
    )),
    o=document.getElementById("pieChart"),
    o&&(o.getContext("2d"), new Chart(o, {
        type:"pie", data: {
            labels:["Potatoes", "Tomatoes", "Onions"], datasets:[ {
                data: [25, 10, 15], backgroundColor:["rgba("+t.primary+", .1)", "rgba("+t.primary+", .5)", "rgba("+t.primary+", .25)"], borderColor:"rgba("+t.primary+")", borderWidth:2
            }
            ]
        }
        , options: {
            maintainAspectRatio: !1, plugins: {
                legend: {
                    position:"bottom", labels: {
                        usePointStyle:  !0, padding:20
                    }
                }
                , tooltip:e
            }
        }
    }
    )),
    o=document.getElementById("pieChartWithShadow"),
    o&&(o.getContext("2d"), new Chart(o, {
        type:"pieWithShadow", data: {
            labels:["Potatoes", "Tomatoes", "Onions"], datasets:[ {
                data: [25, 10, 15], backgroundColor:["rgba("+t.primary+", .1)", "rgba("+t.primary+", .5)", "rgba("+t.primary+", .25)"], borderColor:"rgba("+t.primary+")", borderWidth:2
            }
            ]
        }
        , options: {
            maintainAspectRatio: !1, plugins: {
                legend: {
                    position:"bottom", labels: {
                        usePointStyle:  !0, padding:20
                    }
                }
                , tooltip:e
            }
        }
    }
    )),
    o=document.getElementById("doughnutChart"),
    o&&(o.getContext("2d"), new Chart(o, {
        type:"doughnut", data: {
            labels:["Potatoes", "Tomatoes", "Onions"], datasets:[ {
                data: [25, 10, 15], backgroundColor:["rgba("+t.primary+", .1)", "rgba("+t.primary+", .5)", "rgba("+t.primary+", .25)"], borderColor:"rgba("+t.primary+")", borderWidth:2
            }
            ]
        }
        , options: {
            maintainAspectRatio: !1, cutout:"75%", plugins: {
                legend: {
                    position:"bottom", labels: {
                        usePointStyle:  !0, padding:20
                    }
                }
                , tooltip:e
            }
        }
    }
    )),
    o=document.getElementById("doughnutChartWithShadow"),
    o&&(o.getContext("2d"), new Chart(o, {
        type:"doughnutWithShadow", data: {
            labels:["Potatoes", "Tomatoes", "Onions"], datasets:[ {
                data: [25, 10, 15], backgroundColor:["rgba("+t.primary+", .1)", "rgba("+t.primary+", .5)", "rgba("+t.primary+", .25)"], borderColor:"rgba("+t.primary+")", borderWidth:2
            }
            ]
        }
        , options: {
            maintainAspectRatio: !1, cutout:"75%", plugins: {
                legend: {
                    position:"bottom", labels: {
                        usePointStyle:  !0, padding:20
                    }
                }
                , tooltip:e
            }
        }
    }
    )),
    o=document.getElementById("radarChart"),
    o&&(o.getContext("2d"), new Chart(o, {
        type:"radar", data: {
            labels:["Drinks", "Snacks", "Lunch", "Dinner"], datasets:[ {
                label: "Potatoes", data:[25, 25, 25, 25], backgroundColor:"rgba("+t.primary+", .1)", borderColor:"rgba("+t.primary+")", borderWidth:2, fill: !0, pointBackgroundColor:"#ffffff", pointBorderColor:"rgba("+t.primary+")", pointBorderWidth:2, pointRadius:4, pointHoverBackgroundColor:"rgba("+t.primary+")", pointHoverBorderColor:"#ffffff", pointHoverBorderWidth:2, pointHoverRadius:6
            }
            , {
                label: "Tomatoes", data:[15, 15, 0, 15], backgroundColor:"rgba("+t.primary+", .25", borderColor:"rgba("+t.primary+")", borderWidth:2, fill: !0, pointBackgroundColor:"#ffffff", pointBorderColor:"rgba("+t.primary+")", pointBorderWidth:2, pointRadius:4, pointHoverBackgroundColor:"rgba("+t.primary+")", pointHoverBorderColor:"#ffffff", pointHoverBorderWidth:2, pointHoverRadius:6
            }
            ]
        }
        , options: {
            maintainAspectRatio: !1, plugins: {
                legend: {
                    position:"bottom", labels: {
                        usePointStyle:  !0, padding:20
                    }
                }
                , tooltip:e
            }
            , scales: {
                r: {
                    max:30, ticks: {
                        display:  !1
                    }
                }
            }
        }
    }
    )),
    o=document.getElementById("radarChartWithShadow"),
    o&&(o.getContext("2d"), new Chart(o, {
        type:"radarWithShadow", data: {
            labels:["Drinks", "Snacks", "Lunch", "Dinner"], datasets:[ {
                label: "Potatoes", data:[25, 25, 25, 25], backgroundColor:"rgba("+t.primary+", .1)", borderColor:"rgba("+t.primary+")", borderWidth:2, fill: !0, pointBackgroundColor:"#ffffff", pointBorderColor:"rgba("+t.primary+")", pointBorderWidth:2, pointRadius:4, pointHoverBackgroundColor:"rgba("+t.primary+")", pointHoverBorderColor:"#ffffff", pointHoverBorderWidth:2, pointHoverRadius:6
            }
            , {
                label: "Tomatoes", data:[15, 15, 0, 15], backgroundColor:"rgba("+t.primary+", .25", borderColor:"rgba("+t.primary+")", borderWidth:2, fill: !0, pointBackgroundColor:"#ffffff", pointBorderColor:"rgba("+t.primary+")", pointBorderWidth:2, pointRadius:4, pointHoverBackgroundColor:"rgba("+t.primary+")", pointHoverBorderColor:"#ffffff", pointHoverBorderWidth:2, pointHoverRadius:6
            }
            ]
        }
        , options: {
            maintainAspectRatio: !1, plugins: {
                legend: {
                    position:"bottom", labels: {
                        usePointStyle:  !0, padding:20
                    }
                }
                , tooltip:e
            }
            , scales: {
                r: {
                    max:30, ticks: {
                        display:  !1
                    }
                }
            }
        }
    }
    )),
    o=document.getElementById("polarChart"),
    o&&(o.getContext("2d"), new Chart(o, {
        type:"polarArea", data: {
            labels:["Potatoes", "Tomatoes", "Onions"], datasets:[ {
                data: [25, 10, 15], backgroundColor:["rgba("+t.primary+", .1)", "rgba("+t.primary+", .5)", "rgba("+t.primary+", .25)"], borderColor:"rgba("+t.primary+")", borderWidth:2
            }
            ]
        }
        , options: {
            maintainAspectRatio: !1, plugins: {
                legend: {
                    position:"bottom", labels: {
                        usePointStyle:  !0, padding:20
                    }
                }
                , tooltip:e
            }
            , scales: {
                r: {
                    ticks: {
                        display:  !1
                    }
                }
            }
            , layout: {
                padding: 5
            }
        }
    }
    )),
    o=document.getElementById("polarChartWithShadow"),
    o&&(o.getContext("2d"), new Chart(o, {
        type:"polarAreaWithShadow", data: {
            labels:["Potatoes", "Tomatoes", "Onions"], datasets:[ {
                data: [25, 10, 15], backgroundColor:["rgba("+t.primary+", .1)", "rgba("+t.primary+", .5)", "rgba("+t.primary+", .25)"], borderColor:"rgba("+t.primary+")", borderWidth:2
            }
            ]
        }
        , options: {
            maintainAspectRatio: !1, plugins: {
                legend: {
                    position:"bottom", labels: {
                        usePointStyle:  !0, padding:20
                    }
                }
                , tooltip:e
            }
            , scales: {
                r: {
                    ticks: {
                        display:  !1
                    }
                }
            }
            , layout: {
                padding: 5
            }
        }
    }
    ));
    const a= {
        afterInit:t=> {
            const e=t.canvas.parentNode,
            o=t.data.datasets[0].data[0],
            a=t.data.datasets[0].label,
            r=t.data.labels[0];
            e.querySelector(".chart-heading").innerHTML=a,
            e.querySelector(".chart-value").innerHTML="$"+o,
            e.querySelector(".chart-label").innerHTML=r
        }
    }
    ,
    r= {
        plugins: {
            legend: {
                display:  !1
            }
            ,
            tooltip: {
                enabled: !1,
                intersect: !1,
                external:t=> {
                    const e=t.chart.canvas.parentNode,
                    o=t.tooltip.dataPoints[0].formattedValue,
                    a=t.tooltip.dataPoints[0].dataset.label,
                    r=t.tooltip.dataPoints[0].label;
                    e.querySelector(".chart-heading").innerHTML=a,
                    e.querySelector(".chart-value").innerHTML="$"+o,
                    e.querySelector(".chart-label").innerHTML=r
                }
            }
        }
        ,
        scales: {
            y: {
                display:  !1
            }
            ,
            x: {
                display:  !1
            }
        }
        ,
        layout: {
            padding: {
                left: 5, right:5, top:10, bottom:10
            }
        }
    }
    ;
    o=document.getElementById("lineWithAnnotationChart1"),
    o&&(o.getContext("2d"), new Chart(o, {
        type:"lineWithAnnotation", plugins:[a], data: {
            labels:["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], datasets:[ {
                label: "Total Orders", data:[1250, 1300, 1550, 900, 1800, 1100, 1600], borderColor:"rgba("+t.primary+")", borderWidth:2, pointBorderColor:"rgba("+t.primary+")", pointBorderWidth:4, pointRadius:2, pointHoverBackgroundColor:"rgba("+t.primary+")", pointHoverBorderColor:"#ffffff", pointHoverRadius:2, tension:.5
            }
            ]
        }
        , options:r
    }
    )),
    o=document.getElementById("lineWithAnnotationChart2"),
    o&&(o.getContext("2d"), new Chart(o, {
        type:"lineWithAnnotation", plugins:[a], data: {
            labels:["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], datasets:[ {
                label: "Active Orders", data:[100, 125, 75, 125, 100, 75, 75], borderColor:"rgba("+t.primary+")", borderWidth:2, pointBorderColor:"rgba("+t.primary+")", pointBorderWidth:4, pointRadius:2, pointHoverBackgroundColor:"rgba("+t.primary+")", pointHoverBorderColor:"#ffffff", pointHoverRadius:2, tension:.5
            }
            ]
        }
        , options:r
    }
    )),
    o=document.getElementById("lineWithAnnotationChart3"),
    o&&(o.getContext("2d"), new Chart(o, {
        type:"lineWithAnnotation", plugins:[a], data: {
            labels:["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], datasets:[ {
                label: "Pending Orders", data:[300, 300, 600, 700, 600, 300, 300], borderColor:"rgba("+t.primary+")", borderWidth:2, pointBorderColor:"rgba("+t.primary+")", pointBorderWidth:4, pointRadius:2, pointHoverBackgroundColor:"rgba("+t.primary+")", pointHoverBorderColor:"#ffffff", pointHoverRadius:2, tension:.5
            }
            ]
        }
        , options:r
    }
    )),
    o=document.getElementById("lineWithAnnotationChart4"),
    o&&(o.getContext("2d"), new Chart(o, {
        type:"lineWithAnnotation", plugins:[a], data: {
            labels:["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], datasets:[ {
                label: "Shipped Orders", data:[200, 400, 200, 500, 100, 100, 400], borderColor:"rgba("+t.primary+")", borderWidth:2, pointBorderColor:"rgba("+t.primary+")", pointBorderWidth:4, pointRadius:2, pointHoverBackgroundColor:"rgba("+t.primary+")", pointHoverBorderColor:"#ffffff", pointHoverRadius:2, tension:.5
            }
            ]
        }
        , options:r
    }
    )),
    o=document.getElementById("lineWithAnnotationAndShadowChart1"),
    o&&(o.getContext("2d"), new Chart(o, {
        type:"lineWithAnnotationAndShadow", plugins:[a], data: {
            labels:["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], datasets:[ {
                label: "Total Orders", data:[1250, 1300, 1550, 900, 1800, 1100, 1600], borderColor:"rgba("+t.primary+")", borderWidth:2, pointBorderColor:"rgba("+t.primary+")", pointBorderWidth:4, pointRadius:2, pointHoverBackgroundColor:"rgba("+t.primary+")", pointHoverBorderColor:"#ffffff", pointHoverRadius:2, tension:.5
            }
            ]
        }
        , options:r
    }
    )),
    o=document.getElementById("lineWithAnnotationAndShadowChart2"),
    o&&(o.getContext("2d"), new Chart(o, {
        type:"lineWithAnnotationAndShadow", plugins:[a], data: {
            labels:["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], datasets:[ {
                label: "Active Orders", data:[100, 125, 75, 125, 100, 75, 75], borderColor:"rgba("+t.primary+")", borderWidth:2, pointBorderColor:"rgba("+t.primary+")", pointBorderWidth:4, pointRadius:2, pointHoverBackgroundColor:"rgba("+t.primary+")", pointHoverBorderColor:"#ffffff", pointHoverRadius:2, tension:.5
            }
            ]
        }
        , options:r
    }
    )),
    o=document.getElementById("lineWithAnnotationAndShadowChart3"),
    o&&(o.getContext("2d"), new Chart(o, {
        type:"lineWithAnnotationAndShadow", plugins:[a], data: {
            labels:["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], datasets:[ {
                label: "Pending Orders", data:[300, 300, 600, 700, 600, 300, 300], borderColor:"rgba("+t.primary+")", borderWidth:2, pointBorderColor:"rgba("+t.primary+")", pointBorderWidth:4, pointRadius:2, pointHoverBackgroundColor:"rgba("+t.primary+")", pointHoverBorderColor:"#ffffff", pointHoverRadius:2, tension:.5
            }
            ]
        }
        , options:r
    }
    )),
    o=document.getElementById("lineWithAnnotationAndShadowChart4"),
    o&&(o.getContext("2d"), new Chart(o, {
        type:"lineWithAnnotationAndShadow", plugins:[a], data: {
            labels:["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], datasets:[ {
                label: "Shipped Orders", data:[200, 400, 200, 500, 100, 100, 400], borderColor:"rgba("+t.primary+")", borderWidth:2, pointBorderColor:"rgba("+t.primary+")", pointBorderWidth:4, pointRadius:2, pointHoverBackgroundColor:"rgba("+t.primary+")", pointHoverBorderColor:"#ffffff", pointHoverRadius:2, tension:.5
            }
            ]
        }
        , options:r
    }
    ))
}

const customFileInput=()=> {
    on("body", "change", 'input[type="file"]', t=> {
        const e=t.target.value.split("\\").pop();
        t.target.parentNode.querySelector(".file-name").innerHTML=e
    }
    )
}

;
on("body", "change", 'input[type="file"]', t=> {
    const e=t.target.value.split("\\").pop();
    t.target.parentNode.querySelector(".file-name").innerHTML=e
}

);
const fullscreen=()=> {
    const t=document.getElementById("fullScreenToggler");
    if( !t)return;
    const e=document.documentElement;
    t.addEventListener("click", ()=> {
        document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement?document.exitFullscreen?document.exitFullscreen(): document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitExitFullscreen?document.webkitExitFullscreen():document.msExitFullscreen&&document.msExitFullscreen():e.requestFullscreen?e.requestFullscreen():e.mozRequestFullScreen?e.mozRequestFullScreen():e.webkitRequestFullscreen?e.webkitRequestFullscreen():e.msRequestFullscreen&&e.msRequestFullscreen(), t.classList.contains("la-expand-arrows-alt")?(t.classList.remove("la-expand-arrows-alt"), t.classList.add("la-compress-arrows-alt")):(t.classList.remove("la-compress-arrows-alt"), t.classList.add("la-expand-arrows-alt"))
    }
    )
}

;
fullscreen();
const menu=()=> {
    const t=document.documentElement,
    e=localStorage.getItem("menuType"),
    o=document.querySelector(".menu-bar"),
    a=document.querySelector(".menu-items");
    if( !o)return;
    e&&(t.classList.add(e), o.classList.add(e));
    if(e === "default")
        document.querySelector(".btnVerIconos").classList.add("none")
    else
        document.querySelector(".btnVerLeyendas").classList.add("none")
    const r=()=> {
        o.querySelectorAll(".menu-detail.open").forEach(t=> {
            hideOverlay(), o.classList.contains("menu-wide")||t.classList.remove("open")
        }
        )
    }
    ;
    document.addEventListener("click", t=> {
        t.target.closest(".menu-items a")||t.target.closest(".menu-detail")||o.classList.contains("menu-wide")||r()
    }
    ),
    on(".menu-items", "click", ".link", t=> {
        const e=t.target.closest(".link").dataset.target, a=o.querySelector(e);
        o.classList.contains("menu-wide")||(a?(showOverlay( !0), a.classList.add("open")): hideOverlay(), r(), a?(showOverlay( !0), a.classList.add("open")):hideOverlay())
    }
    );
    on(".top-bar", "click", "[data-toggle='menu']", e=> {
        o.classList.contains("menu-hidden")?(t.classList.remove("menu-hidden"), o.classList.remove("menu-hidden")): (t.classList.add("menu-hidden"), o.classList.add("menu-hidden"))
    }
    );
    const i=()=> {
        o.querySelector(".menu-header").classList.remove("hidden"),
        o.querySelectorAll(".menu-items .link").forEach(t=> {
            const e=t.dataset.target, a=o.querySelector(".menu-detail"+e);
            a&&(a.classList.add("collapse"), t.setAttribute("data-toggle", "collapse"), t.after(a))
        }
        )
    }
    ,
    n=()=> {
        t.classList.remove("menu-wide"),
        o.classList.remove("menu-wide"),
        o.querySelector(".menu-header").classList.add("hidden"),
        o.querySelectorAll(".menu-items .link").forEach(t=> {
            const e=t.dataset.target, r=o.querySelector(".menu-detail"+e);
            r&&(r.classList.remove("collapse"), t.removeAttribute("data-toggle", "collapse"), a.after(r))
        }
        )
    }
    ;
    o.classList.contains("menu-wide")&&i(),
    on(".menu-bar", "click", "[data-toggle='menu-type']", e=> {
        (e=> {
            const a=o.querySelector(".menu-detail.open");
            switch(e) {
                case"icon-only": t.classList.add("menu-icon-only"), o.classList.add("menu-icon-only"), localStorage.setItem("menuType", "menu-icon-only"), o.classList.contains("menu-wide")&&(n(), a&&showOverlay( !0));
                document.querySelector(".btnVerIconos").classList.add("none");
                document.querySelector(".btnVerLeyendas").classList.remove("none")
                break;
                case"wide": t.classList.add("menu-wide"), o.classList.add("menu-wide"), localStorage.setItem("menuType", "menu-wide"), t.classList.remove("menu-icon-only"), o.classList.remove("menu-icon-only"), i(), a&&hideOverlay();
                break;
                case"hidden": t.classList.add("menu-hidden"), o.classList.add("menu-hidden"), localStorage.setItem("menuType", "menu-hidden"), r();
                break;
                default: t.classList.remove("menu-icon-only"), o.classList.remove("menu-icon-only"), localStorage.removeItem("menuType"), o.classList.contains("menu-wide")&&(n(), a&&showOverlay( !0)), document.querySelector(".btnVerLeyendas").classList.add("none"), document.querySelector(".btnVerIconos").classList.remove("none")
            }
        }
        )(e.target.closest("[data-toggle='menu-type']").dataset.value)
    }
    )
}

;
menu();
const showActivePage=()=> {
    const t=window.location.href.split(/[?#]/)[0],
    e=document.querySelectorAll(".menu-bar a");
    e&&e.forEach(e=> {
        if(e.href===t) {
            e.classList.add("active");
            const t=e.closest(".menu-detail");
            if( !t)return;
            document.querySelector('.menu-items .link[data-target="[data-menu='+t.dataset.menu+']"]').classList.add("active")
        }
    }
    )
}

;
showActivePage();
const modal=()=> {
    on("body", "click", '[data-toggle="modal"]', e=> {
        (e=> {
            showOverlay(), e.classList.add("active");
            const o=e.dataset.animations.split(", ")[0], a=e.querySelector(".modal-content");
            animateCSS(a, o), e.addEventListener("click", o=> {
                void 0===e.dataset.staticBackdrop&&e===o.target&&t(e)
            }
            )
        }
        )(document.querySelector(e.target.dataset.target))
    }
    );
    const t=t=> {
        hideOverlay();
        const e=t.dataset.animations.split(", ")[1],
        o=t.querySelector(".modal-content");
        animateCSS(o, e).then(()=> {
            t.classList.remove("active")
        }
        )
    }
    ;
    on(".modal", "click", '[data-dismiss="modal"]', e=> {
        const o=e.target.closest(".modal");
        t(o)
    }
    )
}

;
modal();
const showOverlay=t=> {
    if(document.querySelector(".overlay"))return;
    document.body.classList.add("overlay-show");
    const e=document.createElement("div");
    t?e.setAttribute("class", "overlay workspace"): e.setAttribute("class", "overlay"), document.body.appendChild(e), e.classList.add("active")
}

,
hideOverlay=()=> {
    overlayToRemove=document.querySelector(".overlay"),
    overlayToRemove&&(document.body.classList.remove("overlay-show"), overlayToRemove.classList.remove("active"), document.body.removeChild(overlayToRemove))
}

,
ratingStars=()=> {
    rateStars=t=> {
        const e=t.target.closest(".rating-stars"),
        o=Array.from(e.children);
        let a=0;
        a=o.length-o.indexOf(t.target),
        o.forEach(t=>t.classList.remove("active")),
        t.target.classList.add("active"),
        console.log("You have rated "+a+" stars.")
    }
    ,
    on("body", "click", ".rating-stars", t=> {
        rateStars(t)
    }
    )
}

;
rateStars=t=> {
    const e=t.target.closest(".rating-stars"),
    o=Array.from(e.children);
    let a=0;
    a=o.length-o.indexOf(t.target),
    o.forEach(t=>t.classList.remove("active")),
    t.target.classList.add("active"),
    console.log("You have rated "+a+" stars.")
}

,
on("body", "click", ".rating-stars", t=> {
    rateStars(t)
}

);
const showPassword=()=> {
    on("body", "click", '[data-toggle="password-visibility"]', t=> {
        (t=> {
            const e=t.closest(".form-control-addon-within").querySelector("input");
            "password"===e.type?(e.type="text", t.classList.remove("text-gray-600", "dark:text-gray-600"), t.classList.add("text-primary", "dark:text-primary")): (e.type="password", t.classList.remove("text-primary", "dark:text-primary"), t.classList.add("text-gray-600", "dark:text-gray-600"))
        }
        )(t.target.closest('[data-toggle="password-visibility"]'))
    }
    )
}

;
on("body", "click", '[data-toggle="password-visibility"]', t=> {
    (t=> {
        const e=t.closest(".form-control-addon-within").querySelector("input");
        "password"===e.type?(e.type="text", t.classList.remove("text-gray-600", "dark:text-gray-600"), t.classList.add("text-primary", "dark:text-primary")): (e.type="password", t.classList.remove("text-primary", "dark:text-primary"), t.classList.add("text-gray-600", "dark:text-gray-600"))
    }
    )(t.target.closest('[data-toggle="password-visibility"]'))
}

);
const sidebar=()=> {
    on("body", "click", '[data-toggle="sidebar"]', ()=> {
        (()=> {
            const t=document.querySelector(".sidebar");
            t.classList.contains("open")?(t.classList.remove("open"), hideOverlay()): (t.classList.add("open"), showOverlay( !0))
        }
        )()
    }
    )
}

;
sidebar();
const tabs=()=> {
    let t= !1;
    on("body", "click", '[data-toggle="tab"]', e=> {
        const o=e.target.closest('[data-toggle="tab"]'), a=o.closest(".tabs"), r=a.querySelector(".tab-nav .active"), i=a.querySelector(".collapse.open"), n=a.querySelector(o.dataset.target);
        t||r !==o&&(r.classList.remove("active"), o.classList.add("active"), t= !0, closeCollapse(i, ()=> {
            openCollapse(n, ()=> {
                t= !1
            }
            )
        }
        ))
    }
    ),
    on("body", "click", '[data-toggle="wizard"]', t=> {
        const e=t.target.closest(".wizard"), o=t.target.dataset.direction, a=e.querySelectorAll(".nav-link"), r=e.querySelector(".nav-link.active");
        let i=0;
        switch(a.forEach((t, e)=> {
            t===r&&(i=e)
        }
        ), o) {
            case"next": a[i+1]&&a[i+1].click();
            break;
            case"previous": a[i-1]&&a[i-1].click()
        }
    }
    )
}

;
tabs();
const customTippy=()=> {
    tippy.delegate("body", {
        target: '.menu-icon-only [data-toggle="tooltip-menu"]', touch:["hold", 500], theme:"light-border tooltip", offset:[0, 12], interactive: !0, animation:"scale", placement:"right", appendTo:()=>document.body
    }
    ),
    tippy('[data-toggle="tooltip"]', {
        theme: "light-border tooltip", touch:["hold", 500], offset:[0, 12], interactive: !0, animation:"scale"
    }
    ),
    tippy('[data-toggle="popover"]', {
        theme: "light-border popover", offset:[0, 12], interactive: !0, allowHTML: !0, trigger:"click", animation:"shift-toward-extreme", content:t=>"<h5>"+t.dataset.popoverTitle+'</h5><div class="mt-5">'+t.dataset.popoverContent+"</div>"
    }
    ),
    tippy('[data-toggle="dropdown-menu"]', {
        theme:"light-border", zIndex:25, offset:[0, 8], arrow: !1, placement:"bottom-start", interactive: !0, allowHTML: !0, animation:"shift-toward-extreme", content:t=> {
            let e=t.closest(".dropdown").querySelector(".dropdown-menu");
            return e=e.outerHTML, e
        }
    }
    ),
    tippy('[data-toggle="custom-dropdown-menu"]', {
        theme:"light-border", zIndex:25, offset:[0, 8], arrow: !1, placement:"bottom-start", interactive: !0, allowHTML: !0, animation:"shift-toward-extreme", content:t=> {
            let e=t.closest(".dropdown").querySelector(".custom-dropdown-menu");
            return e=e.outerHTML, e
        }
    }
    ),
    tippy('[data-toggle="search-select"]', {
        theme:"light-border", offset:[0, 8], maxWidth:"none", arrow: !1, placement:"bottom-start", trigger:"click", interactive: !0, allowHTML: !0, animation:"shift-toward-extreme", content:t=> {
            let e=t.closest(".search-select").querySelector(".search-select-menu");
            return e=e.outerHTML, e
        }
        , appendTo:t=>t.closest(".search-select")
    }
    )
}

;
tippy.delegate("body", {
    target: '.menu-icon-only [data-toggle="tooltip-menu"]', touch:["hold", 500], theme:"light-border tooltip", offset:[0, 12], interactive: !0, animation:"scale", placement:"right", appendTo:()=>document.body
}

),
tippy('[data-toggle="tooltip"]', {
    theme: "light-border tooltip", touch:["hold", 500], offset:[0, 12], interactive: !0, animation:"scale"
}

),
tippy('[data-toggle="popover"]', {
    theme: "light-border popover", offset:[0, 12], interactive: !0, allowHTML: !0, trigger:"click", animation:"shift-toward-extreme", content:t=>"<h5>"+t.dataset.popoverTitle+'</h5><div class="mt-5">'+t.dataset.popoverContent+"</div>"
}

),
tippy('[data-toggle="dropdown-menu"]', {
    theme:"light-border", zIndex:25, offset:[0, 8], arrow: !1, placement:"bottom-start", interactive: !0, allowHTML: !0, animation:"shift-toward-extreme", content:t=> {
        let e=t.closest(".dropdown").querySelector(".dropdown-menu");
        return e=e.outerHTML, e
    }
}

),
tippy('[data-toggle="custom-dropdown-menu"]', {
    theme:"light-border", zIndex:25, offset:[0, 8], arrow: !1, placement:"bottom-start", interactive: !0, allowHTML: !0, animation:"shift-toward-extreme", content:t=> {
        let e=t.closest(".dropdown").querySelector(".custom-dropdown-menu");
        return e=e.outerHTML, e
    }
}

),
tippy('[data-toggle="search-select"]', {
    theme:"light-border", offset:[0, 8], maxWidth:"none", arrow: !1, placement:"bottom-start", trigger:"click", interactive: !0, allowHTML: !0, animation:"shift-toward-extreme", content:t=> {
        let e=t.closest(".search-select").querySelector(".search-select-menu");
        return e=e.outerHTML, e
    }
    , appendTo:t=>t.closest(".search-select")
}

);
const toasts=()=> {
    const t=document.getElementById("toasts-container");
    on("body", "click", '[data-toggle="toast"]', e=> {
        (e=> {
            const o=e.dataset.title, a=e.dataset.content;
            let r='<div class="toast mb-5"><div class="toast-header"><h5>'+o+"</h5><small>"+e.dataset.time+'</small><button type="button" class="close" data-dismiss="toast">&times</button></div><div class="toast-body">'+a+"</div></div>";
            r=(new DOMParser).parseFromString(r, "text/html").body.firstChild, t.appendChild(r), animateCSS(r, "fadeInUp")
        }
        )(e.target)
    }
    );
    on("body", "click", '[data-dismiss="toast"]', t=> {
        (t=> {
            t.style.overflowY="hidden", t.style.height=t.offsetHeight+"px", animateCSS(t, "fadeOutUp").then(()=> {
                t.style.transitionProperty="height, margin, padding, border, opacity", t.style.transitionDuration="200ms", t.style.transitionTimingFunction="linear", t.style.opacity=0, t.style.height=0, t.style.marginTop=0, t.style.marginBottom=0, t.style.paddingTop=0, t.style.paddingBottom=0, t.style.border=0
            }
            ), t.addEventListener("transitionend", ()=> {
                t.parentNode&&t.parentNode.removeChild(t)
            }
            , {
                once:  !0
            }
            )
        }
        )(t.target.closest(".toast"))
    }
    )
}

;
toasts();