// const colors = [
//   "#BE0505",
//   "#3C9437",
//   "#FFAB35",
//   "#FF6B35",
//   "#4B6EE3",
//   "#9747FF",
//   "#244BCB",
// ]; // Example brand colors

// function shuffleArray(array) {
//   const shuffled = array.slice(); // Make a copy of the array
//   for (let i = shuffled.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//   }
//   return shuffled;
// }

// export default function assignColorsToCourses(courses) {
//   let shuffledColors = shuffleArray(colors);
//   const assignedColors = [];

//   courses.forEach((course, index) => {
//     // If we run out of unique colors, reshuffle and start again
//     if (index >= shuffledColors.length) {
//       shuffledColors = shuffleArray(colors);
//     }

//     // Assign color and store it in the course object
//     const color = shuffledColors[index % shuffledColors.length];
//     assignedColors.push({ ...course, color });
//   });

//   return assignedColors;
// }
