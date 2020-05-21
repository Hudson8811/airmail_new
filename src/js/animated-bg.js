


function forEach(array, callback, scope) {
    for (let i = 0; i < array.length; i++) {
        callback.call(scope, i, array[i]); // passes back stuff we need
    }
};

// Return random integer from interval
function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max - min + 1) + min);
}

// Generated with MorphSVGPlugin.pathDataToBezier('#Features-blueLine path').reverse();
// reverse() because path was drawn backwards :/
const graphPath = [{"x":1.5999999999999233,"y":712.4},{"x":27.79999999999992,"y":712.4},{"x":29.39999999999992,"y":745.4},{"x":71.39999999999992,"y":742.4},{"x":119.29999999999993,"y":739},{"x":122.89999999999992,"y":682.5},{"x":162.39999999999992,"y":673.4},{"x":188.39999999999992,"y":667.4},{"x":198.39999999999992,"y":686.4},{"x":239.5999999999999,"y":682.4},{"x":298.2999999999999,"y":676.6999999999999},{"x":320.5999999999999,"y":591.4},{"x":363.5999999999999,"y":591.4},{"x":405.5999999999999,"y":591.4},{"x":432.2999999999999,"y":659.4},{"x":486.5999999999999,"y":659.4},{"x":536.5999999999999,"y":659.4},{"x":541.5999999999999,"y":622.4},{"x":573.5999999999999,"y":622.4},{"x":606.5999999999999,"y":622.4},{"x":605.5999999999999,"y":652.4},{"x":645.5999999999999,"y":652.4},{"x":698.5999999999999,"y":652.4},{"x":738.5999999999999,"y":554.4},{"x":841.5999999999999,"y":554.4},{"x":919.5999999999999,"y":554.4},{"x":930.5999999999999,"y":595.4},{"x":981.5999999999999,"y":595.4},{"x":1032.6,"y":595.4},{"x":1054.6,"y":563.4},{"x":1097.6,"y":563.4},{"x":1140.6,"y":563.4},{"x":1146.6,"y":590.4},{"x":1189.6,"y":590.4},{"x":1252.6,"y":590.4},{"x":1270.6,"y":509.4},{"x":1338.6,"y":509.4},{"x":1388.6,"y":509.4},{"x":1392.6,"y":531.4},{"x":1429.6,"y":531.4},{"x":1516.6,"y":531.4},{"x":1540.6,"y":371.4},{"x":1622.6,"y":371.4},{"x":1681.6,"y":371.4},{"x":1680.8,"y":253.5},{"x":1766.3999999999999,"y":235.4},{"x":1858.6,"y":215.9},{"x":1870.9999999999998,"y":154.4},{"x":1916.3999999999999,"y":109.10000000000001},{"x":1961.8,"y":63.800000000000004},{"x":2001.6,"y":65.4},{"x":2001.6,"y":65.4}];

TweenMax.set('#Features-SVG', {
    visibility: 'visible'
});

// Set dots to hidden
// We'll be fading these in later
TweenMax.set('.Features-dot', {
    opacity: 0
});

function dotMotion() {
    forEach(document.querySelectorAll('.Features-dot'), (index, value) => {
        gsap.registerPlugin(MotionPathPlugin);
        const tl = new  gsap.timeline({
            repeat: -1,
            delay: (index + randomIntFromInterval(1, 3))
        });

        tl
            .to(value, 1, {
                opacity: 1
            }, 'dot-path')
            .to(value, 20, {
                motionPath: {
                    path: graphPath,
                    type: 'cubic'
                },
                ease: Power0.easeNone
            }, 'dot-path')
            .to(value, 1, {
                delay: 19,
                opacity: 0
            }, 'dot-path');
    });
}

const featuresGraphTimeline = new TimelineMax({
    // Fire dot motion while blue line is being drawn
    onStart: dotMotion()
});

featuresGraphTimeline
// Draw blue line
    .fromTo('#Features-blueLine .Features-blueStroke', 2.5, {
        drawSVG: '100% 100%'
    }, {
        drawSVG: '0 100%',
        ease: Power0.easeNone
    }, 'droplet-lines')
    .staggerFrom('.Features-dropletLineGroup', .5, {
        delay: .5,
        y: '100%'
    }, 0.25, 'droplet-lines')
    .staggerFrom('.Features-dropletLineGroup .eman', .25, {
        delay: 1.75,
        scale: 0,
        opacity: 0,
        transformOrigin: 'center center'
    }, 0.25, 'droplet-lines')
    .fromTo('.Features-gradientGroup1', 1, {
        opacity: 0,
    }, {
        delay: 2.25,
        opacity: 0.02,
    }, 'droplet-lines')
    .fromTo('.Features-gradientGroup2', .5, {
        opacity: 0,
        y: 96
    }, {
        delay: 2.5,
        opacity: 0.02,
        y: 64
    }, 'droplet-lines');

