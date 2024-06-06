import apiService from "../apiService";

export const getAccuracyScores = async (mentorId, userId) => {
  try {
    const response = await apiService.get(
      `/insights/accuracy/scores?studentId=${userId}&mentorId=${mentorId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getQuizDetails = async (mentorId, userId, page, quizId = null) => {
  try {
    const params = {
      studentId: userId,
      limit: 10,
      page: page,
      mentorId: mentorId,
    };

    if (quizId !== null) {
      params.quizId = quizId;
    }
    const response = await apiService.get(`/insights/quiz`, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
