import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import Logo from '../components/Logo';
import ArrowLeft from '../components/ArrowLeft'

export default function WavySquareLogoLesss({ customStyles, height = 160, top = 130 }) {
    return (
        <View style={[customStyles, { height }]}>
            <View style={[styles.squareTop, { height }]}>
                <ArrowLeft  style={styles.arrowLeft}/>
                <Svg
                    height="60%"
                    width="100%"
                    // viewBox="0 0 1440 320"
                    viewBox="0 0 1440 200"

                    style={{ position: 'absolute', top: 95 }}
                >
                    {/* Define Gradient */}
                    <Defs>
                        <LinearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
                            <Stop offset="0%" stopColor="#0077B6" stopOpacity="1" />
                            <Stop offset="100%" stopColor="#00A8E8" stopOpacity="1" />
                        </LinearGradient>
                    </Defs>

                    {/* Apply Gradient */}
                    <Path 
                        fill="url(#gradient)"
                        d="M0,128L80,144C160,160,320,192,480,181.3C640,171,800,
                        117,960,112C1120,107,1280,149,1360,170.7L1440,192L1440,
                        0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,
                        0,80,0L0,0Z"
                    />
                </Svg>
        
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    squareTop: { 
        backgroundColor: '#00A8E8',
        position: 'relative',
    },

    logo: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: 50,
    }
});


// 2nd wavey head implementation -----------------------------------------------------------------------
// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import Svg, { Path } from 'react-native-svg';
// import Logo from '../components/Logo'


// export default function WavySquare({ customStyles, height = 160, top = 130 }) {
//     return (
//         <View style={[customStyles, { height }]}>
//             <View style={[styles.squareTop, { height }]}>
//                 <Svg
//                     height="60%"
//                     width="100%"
//                     viewBox="0 0 1440 320"
//                     style={{ position: 'absolute', top }}>
//                     <Path 
//                         fill="#00A8E8"
//                         d="M0,128L80,144C160,160,320,192,480,181.3C640,171,800,
//                         117,960,112C1120,107,1280,149,1360,170.7L1440,192L1440,
//                         0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,
//                         0,80,0L0,0Z"
//                     />
//                 </Svg>
//                 <View style={styles.logo}>
//                     <Logo/>
//                 </View>
//             </View>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     squareTop: { 
//         backgroundColor: '#00A8E8'
//     },

//     logo: {
//         position: 'absolute',
//         alignSelf: 'center',
//         bottom: 50,
//     }
// });

// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import Svg, { Path } from 'react-native-svg';
// import { LinearGradient } from 'expo-linear-gradient'; // Import Expo's LinearGradient
// import Logo from '../components/Logo';

// export default function WavySquare({ customStyles, height = 160, top = 130 }) {
//     return (
//         <View style={[customStyles, { height }]}>
//             {/* Gradient Background */}
//             <LinearGradient
//                 colors={['#00A8E8', '#0077B6']} // Smooth transition from light blue to dark blue
//                 style={[styles.squareTop, { height }]}
//             >
//                 {/* Wavy Shape */}
//                 <Svg
//                     height="60%"
//                     width="100%"
//                     viewBox="0 0 1440 320"
//                     style={{ position: 'absolute', top }}
//                 >
//                     <Path 
//                         fill="rgba(0, 0, 0, 0)" // Transparent so gradient shows through
//                         d="M0,128L80,144C160,160,320,192,480,181.3C640,171,800,
//                         117,960,112C1120,107,1280,149,1360,170.7L1440,192L1440,
//                         0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,
//                         0,80,0L0,0Z"
//                     />
//                 </Svg>

//                 {/* Logo Positioned at the Bottom-Center */}
//                 <View style={styles.logo}>
//                     <Logo />
//                 </View>
//             </LinearGradient>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     squareTop: { 
//         position: 'relative', 
//         overflow: 'hidden' 
//     },

//     logo: {
//         position: 'absolute',
//         alignSelf: 'center',
//         bottom: 50,
//     }
// });


// 2nd unsuccessful implementation of wavey header function with svg ------------------------------------------------------------

// import React from "react";
// import { View } from "react-native";
// import Svg, { Path } from 'react-native-svg'

// const WavySquare = ({ width = 300, height = 300, waveHeight = 100, waveFrequency = 10}) => {
//     const wavePath = generateWavePath(width, height, waveHeight, waveFrequency);
//     return (
//         <View style={{height, width, overflow:"hidden"}}>
//             <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
//                 {/* Background Square */}
//                 <Path d={`M0 0 H${width} V${height - waveHeight} ${wavePath} Z`} fill="#00A8E8" />
//             </Svg>
//         </View>
//     );
// };


// // function to generate sine wave path
// const generateWavePath = (width, height, waveHeight, waveFrequency) => {
//     const points = [];
//     for (let i = 0; i <= width; i+=1) {
//         const y = Math.sin((i / width) * waveFrequency * Math.PI * 2) * waveHeight + (height - waveHeight);
//         points.push(`${i},${y}`);
//     }
//     return `L${points.join(" ")} L${width},${height - waveHeight} L0,${height - waveHeight}`
// };

// export default WavySquare;