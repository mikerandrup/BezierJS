///////////////////////////////////////////////////////////////
// JavaScript Implementation of the DeCasteljau Algorithm
// Includes methods for calculating angle & drawing curve
//  - by Mike Randrup September 2012
// use freely with this notice intact
// Based on C++ Implementation from 
//       http://cubic.org/docs/bezier.htm
// which credits Nils Pipenbrinck aka Submissive/Cubic & $eeN
///////////////////////////////////////////////////////////////

/* Usage:

	// A & D are the start and end points of the line
	// B & C are the handle (influence) points

	myPointA = bezier.point(40,100);
	myPointB = bezier.point(80,20);
	myPointC = bezier.point(150,180);
	myPointD = bezier.point(260,100);

	time = 0.5; // halfway through curve

	resultPoint = bezier.calc(
		myPointA, myPointB,
		myPointC, myPointD,
		time
	);
*/

(function(exports){

	var Point = function (x, y) {
		this.x = x || 0;
		this.y = y || 0;
		return this;
	},

	findReverseRadianAngle = function(rawAngle) {
		// -1 .. 1 possible range
		var shiftedAngle = rawAngle + 1,
			shiftedReverseAngle = 2 - rawAngle,
			reversedAngle = shiftedReverseAngle - 1;

			return reversedAngle
	};

	var bezObj = {
	
		point: function(x, y) {
			return new Point(x, y);
		},

		findPoint: function(p1, p2, p3, p4, time) {
			var ab = bezObj.interpolateLinear(p1, p2, time),
				bc = bezObj.interpolateLinear(p2, p3, time),
				cd = bezObj.interpolateLinear(p3, p4, time),
				abbc = bezObj.interpolateLinear(ab, bc, time),
				bccd = bezObj.interpolateLinear(bc, cd, time);
				
			return bezObj.interpolateLinear(abbc, bccd, time);
		},
		
		
		findAngle: function (p1, p2, p3, p4, time) {

		    var ANGLE_SAMPLING_WINDOW = 0.0001;
		
			var earlierTime = time - ANGLE_SAMPLING_WINDOW,
                laterTime = time + ANGLE_SAMPLING_WINDOW;
				
				if (earlierTime < 0) earlierTime = 0;
				if (laterTime > 1) laterTime = 1;
				
			var earlierPoint = bezObj.findPoint(p1, p2, p3, p4, earlierTime),
                laterPoint = bezObj.findPoint(p1, p2, p3, p4, laterTime),

                xDelta = laterPoint.x - earlierPoint.x,
                yDelta = laterPoint.y - earlierPoint.y,

                backwardAngleInRadians = Math.atan2(xDelta, yDelta),
				angleInRadians = findReverseRadianAngle(backwardAngleInRadians);
								
			return angleInRadians;
		},
		
		drawCurve: function (a, b, c, d, steps, context, fillStyle) {

			var resultPoint,
				i,
				t;
		
			context.fillStyle = fillStyle;
		
			for (i=0; i<steps; i++) {
				t = i / (steps-1);
				
				resultPoint = bezObj.findPoint(
					a, b,
					c, d,
					t
				);

				context.fillRect(resultPoint.x, resultPoint.y, 30, 30);
			}
		},
		
		interpolateLinear: function (pointA, pointB, time) {
			return {
				x: pointA.x + (pointB.x - pointA.x) * time,
				y: pointA.y + (pointB.y - pointA.y) * time,
			}
		}
	}
	
	exports.Bezier = bezObj;

}(window.Mike));

///////////////////////////////////////////////////////////////
// Also check out http://13thparallel.com/archive/bezier-curves/
// for an alternate bezier option in JavaScript
///////////////////////////////////////////////////////////////