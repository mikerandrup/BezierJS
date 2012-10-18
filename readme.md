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