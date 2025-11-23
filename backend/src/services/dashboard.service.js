import prisma from '../config/db.js';

/**
 * Get dashboard insights for the logged-in user.
 * @param {string} tokohId - The ID of the TokohUtama.
 * @returns {Promise<object>} Aggregated statistics.
 */
export const getDashboardStats = async (tokohId) => {
  // Total Tujuans
  const totalTujuan = await prisma.tujuan.count({
    where: { tokohId },
  });

  // Total Perjalanans
  const totalPerjalanan = await prisma.perjalanan.count({
    where: {
      tujuan: {
        tokohId,
      },
    },
  });

  // Total Rintangans
  const totalRintangan = await prisma.rintangan.count({
    where: {
      perjalanan: {
        tujuan: {
          tokohId,
        },
      },
    },
  });

  // Total Emosis
  const totalEmosi = await prisma.emosi.count({
    where: {
      rintangan: {
        perjalanan: {
          tujuan: {
            tokohId,
          },
        },
      },
    },
  });

  // Most frequent emotions
  const mostFrequentEmotions = await prisma.emosi.groupBy({
    by: ['jenis_emosi'],
    _count: {
      jenis_emosi: true,
    },
    orderBy: {
      _count: {
        jenis_emosi: 'desc',
      },
    },
    where: {
      rintangan: {
        perjalanan: {
          tujuan: {
            tokohId,
          },
        },
      },
    },
    take: 5, // Top 5
  });

  // Most dominant obstacles
  const mostDominantRintangans = await prisma.rintangan.groupBy({
    by: ['jenis_rintangan'],
    _count: {
      jenis_rintangan: true,
    },
    orderBy: {
      _count: {
        jenis_rintangan: 'desc',
      },
    },
    where: {
      perjalanan: {
        tujuan: {
          tokohId,
        },
      },
    },
    take: 5, // Top 5
  });

  // Progress for each Tujuan (this is a simplified example, could be more complex)
  const tujuanProgress = await prisma.tujuan.findMany({
    where: { tokohId },
    select: {
      id: true,
      jenis_tujuan: true,
      _count: {
        select: {
          perjalanan: true,
        },
      },
    },
  });


  return {
    totals: {
      tujuan: totalTujuan,
      perjalanan: totalPerjalanan,
      rintangan: totalRintangan,
      emosi: totalEmosi,
    },
    mostFrequentEmotions,
    mostDominantRintangans,
    tujuanProgress,
  };
};