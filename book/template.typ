#let somatic_page(title, body_text, illustration_path) = {
  set page(paper: "a5", margin: 2cm)
  set text(font: "Linux Libertine", size: 11pt)
  
  // Header with your brand
  align(right, text(gray, italic)[The Felt Sense | Somatic Shadow Work])
  line(length: 100%, stroke: 0.5pt + gray)
  
  // Page Title
  v(1cm)
  text(size: 20pt, weight: "bold")[#title]
  v(0.5cm)
  
  // The Illustration Placeholder
  rect(width: 100%, height: 6cm, stroke: 1pt + black, fill: luma(240))[
    #align(center + horizon, text(italic, gray)[Illustration: #illustration_path])
  ]
  
  // The Somatic Content
  v(0.5cm)
  body_text
}

// Example Call (This is what Antigravity will generate for you)
#show: doc => somatic_page(
  "The Weight in the Chest",
  "Close your eyes and locate the sensation. Is it a stone? A cloud? Write its texture here...",
  "assets/illustration_01.png"
)