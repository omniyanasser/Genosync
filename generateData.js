const fs = require('fs');
const path = require('path');

// 13 DNA loci names based on real analysis records
const LOCI_NAMES = [
  "D8S1179", "D21S11", "D7S820", "CSF1PO", "D3S1358",
  "TH01", "D13S317", "D16S539", "D2S1338", "D19S433",
  "vWA", "TPOX", "D18S51"
];

// Function to generate random repeats between 8 and 32
function getRandomRepeats() {
  const r1 = Math.floor(Math.random() * 25) + 8;
  const r2 = Math.floor(Math.random() * 25) + 8;
  return [r1, r2];
}

// Function to generate a complete DNA profile
function generateDNA() {
  return LOCI_NAMES.map(locus => ({
    locus: locus,
    repeats: getRandomRepeats()
  }));
}

const children = [];
const parents = [];

// Generate 50 children randomly
for (let i = 1; i <= 50; i++) {
  children.push({
    id: `child_${i}`,
    name: `Unknown Child ${i}`,
    age_estimate: Math.floor(Math.random() * 10) + 2, // age between 2 and 11
    found_location: ["Cairo", "Alexandria", "Giza", "Mansoura"][Math.floor(Math.random() * 4)],
    dna_profile: generateDNA()
  });
}

// Generate 50 parents randomly
for (let i = 1; i <= 50; i++) {
  parents.push({
    id: `parent_${i}`,
    name: `Parent seeking their child ${i}`,
    expected_age: Math.floor(Math.random() * 10) + 2,
    lost_location: ["Cairo", "Alexandria", "Giza", "Mansoura"][Math.floor(Math.random() * 4)],
    dna_profile: generateDNA()
  });
}

// Engineer an intentional match between first parent and first child to test the system
// Rule: there must be at least one matching allele at each locus
const matchedParentDNA = [];
const matchedChildDNA = [];

LOCI_NAMES.forEach(locus => {
  const sharedAllele = Math.floor(Math.random() * 25) + 8; // shared allele
  matchedParentDNA.push({ locus, repeats: [sharedAllele, Math.floor(Math.random() * 25) + 8] });
  matchedChildDNA.push({ locus, repeats: [sharedAllele, Math.floor(Math.random() * 25) + 8] });
});

parents[0].dna_profile = matchedParentDNA;
children[0].dna_profile = matchedChildDNA;
children[0].found_location = parents[0].lost_location; // unify location to increase match accuracy

// Compile the data
const mockData = {
  children,
  parents
};

// Save data to mockDnaData.json file in data folder
const outputPath = path.join(__dirname, 'data', 'mockDnaData.json');
fs.writeFileSync(outputPath, JSON.stringify(mockData, null, 2), 'utf-8');

console.log('✅ Mock data generated successfully! Check the data folder');