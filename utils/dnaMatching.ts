
export type LocusData = {
  locus: string;
  repeats: number[];
};

export type MatchResult = {
  isMatch: boolean;
  matchPercentage: number;
  matchedLociCount: number;
  totalLoci: number;
  details: {
    locus: string;
    isMatched: boolean;
    childRepeats: number[];
    parentRepeats: number[];
  }[];
};

/**
 * Genetic matching function between a child and a parent.
 * It iterates through each locus to ensure at least one allele is shared.
 */
export function calculateDNAMatch(childDNA: LocusData[], parentDNA: LocusData[]): MatchResult {
  let matchedLociCount = 0;
  const totalLoci = childDNA.length; // Usually 13 or more loci
  const details = [];

  // Convert parent array to a Map for faster lookup by locus name
  const parentMap = new Map(parentDNA.map((item) => [item.locus, item.repeats]));

  for (const childLocus of childDNA) {
    const parentRepeats = parentMap.get(childLocus.locus);

    // If the locus is missing from the parent data
    if (!parentRepeats) {
      details.push({
        locus: childLocus.locus,
        isMatched: false,
        childRepeats: childLocus.repeats,
        parentRepeats: [],
      });
      continue;
    }

    // Core Rule: Is there at least one shared repeat (allele)?
    // some() checks if any of the child's repeats are included in the parent's repeats
    const hasCommonRepeat = childLocus.repeats.some((repeat) => parentRepeats.includes(repeat));

    if (hasCommonRepeat) {
      matchedLociCount++;
      details.push({
        locus: childLocus.locus,
        isMatched: true,
        childRepeats: childLocus.repeats,
        parentRepeats: parentRepeats,
      });
    } else {
      details.push({
        locus: childLocus.locus,
        isMatched: false,
        childRepeats: childLocus.repeats,
        parentRepeats: parentRepeats,
      });
    }
  }

  // Calculate the match percentage
  const matchPercentage = Number(((matchedLociCount / totalLoci) * 100).toFixed(2));

  return {
    // Considered a potential match if the percentage is 95% or higher (to account for rare mutations)
    isMatch: matchPercentage >= 92,
    matchPercentage,
    matchedLociCount,
    totalLoci,
    details,
  };
}