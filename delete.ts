.aggregate([
    {
        $match: {
            reference: reference
        }
    },
    {
        $lookup: {
            from: "waves",
            localField: "waveId",
            foreignField: "_id",
            as: "wave"
        }
    },
    {
        $lookup: {
            from: "users",
            localField: "ownerId",
            foreignField: "_id",
            as: "waveCreator"
        }
    }

    /*      {
              $unwind: "$wave"
            },
            {
              $unwind: "$waveCreator"
            }

            */
])
