export const aiService = {
  callNemotron: async (messages: any[], systemPrompt: string) => {
    // @ts-ignore
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    if (!apiKey) {
      throw new Error(".env dosyasında VITE_OPENROUTER_API_KEY bulunamadı.");
    }

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": window.location.href,
          "X-Title": "FitApp"
        },
        body: JSON.stringify({
          model: "nvidia/nemotron-3-super-120b-a12b:free",
          messages: [
            { role: "system", content: systemPrompt },
            ...messages
          ],
          max_tokens: 1500,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        if (response.status === 429) throw new Error("Çok fazla istek atıldı (Rate Limit). Lütfen biraz bekleyin.");
        throw new Error("Ağ hatası oluştu. Lütfen bağlantınızı kontrol edin.");
      }

      const data = await response.json();
      return data.choices?.[0]?.message?.content || "";
    } catch (error: any) {
      console.error("[Nemotron API Error]:", error);
      throw new Error(error.message || "Yapay zeka servisine bağlanırken bir timeout veya bilinmeyen hata oluştu.");
    }
  },

  generateProgram: async (userContext: any, goals: string, equipment: string, priority: string) => {
    const systemPrompt = `Sen uzman bir kişisel antrenör koçusun. Türkçe konuş. 
Kullanıcı bilgileri: ${JSON.stringify(userContext)}
SADECE geçerli JSON döndür, başka hiçbir şey yazma (markdown blockları kullanma). Format:
{ "name": string, "daysPerWeek": number, "schedule": [{ "day": string, "exercises": [{ "name": string, "sets": number, "reps": string, "rest": string }] }] }`;
    
    const userPrompt = `Hedefim: ${goals}. Ekipman: ${equipment}. Öncelikli kas grubum: ${priority}.`;

    const rawResponse = await aiService.callNemotron([{ role: "user", content: userPrompt }], systemPrompt);
    
    try {
      // Very basic cleanup in case the LLM wrapped it in markdown json block
      const cleaned = rawResponse.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleaned);
    } catch (e) {
      console.error("JSON Parse Error:", rawResponse);
      throw new Error("AI geçerli bir program formatı üretemedi.");
    }
  },

  analyzeBody: async (sliderData: any, workoutDistribution: any) => {
    const systemPrompt = `Kullanıcı kas grubu öz değerlendirmesi: ${JSON.stringify(sliderData)}
Son 4 hafta antrenman dağılımı: ${JSON.stringify(workoutDistribution)}
Bu veriye göre:
1. Hangi kas grupları göz ardı edilmiş
2. Orantısızlık analizi
3. Önümüzdeki 8 hafta için öncelik sırası

SADECE JSON döndür (bölüm işaretleri kullanma): 
{ "weakPoints": ["string"], "imbalances": ["string"], "priority8weeks": ["string"], "overallNote": "string" }`;

    const rawResponse = await aiService.callNemotron([{ role: "user", content: "Vücut analizi yap." }], systemPrompt);
    
    try {
      const cleaned = rawResponse.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleaned);
    } catch (e) {
      console.error("JSON Parse Error:", rawResponse);
      throw new Error("AI analizi parse edilemedi.");
    }
  },

  chatWithCoach: async (messages: any[], userContext: any) => {
    const systemPrompt = `Sen FitApp'ın AI fitness koçusun. Kullanıcı verilerine göre kişiselleştirilmiş, bilimsel tavsiyeler ver. Kısa ve net ol, maksimum 3 paragraf. Türkçe konuş.
Kullanıcı Context: ${JSON.stringify(userContext)}`;
    
    return await aiService.callNemotron(messages, systemPrompt);
  }
};
