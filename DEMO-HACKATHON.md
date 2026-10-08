# 🎬 Демо-відео — From Dusk Till Dawn #01 (Agentic Economy)

**Правила:** відео **не довше 90 секунд**. Його і репозиторій треба подати в HQ **до 07:14**.
Очікування можна прискорювати, а **збої вирізати не можна**. Кешований запуск підписуй.

---

## 1. Перед записом (обов'язково)

У Vercel → Environment Variables мають стояти:

- [ ] `MARKET_BUYER_PRIVATE_KEY` і `MARKET_ESCROW_PRIVATE_KEY` — тестові гаманці (на Buyer є USDC, на обох є трохи ETH у Base Sepolia)
- [ ] `MARKET_PROVIDER_ADDRESSES` — гаманець, куди йдуть виплати виконавцям
- [ ] `MARKET_GRAPH_GATE=advisory`
- [ ] `OPENAI_API_KEY`
- [ ] після змін зроблено **Redeploy**

Перевір на сайті `/en/market`:
1. Угорі **зелений** банер «Real testnet money: USDC on Base Sepolia». Якщо банер жовтий, значить ключі не підхопилися
2. Прогони **Run the demo** від початку до кінця без запису
3. Посилання на BaseScan відкриваються і показують транзакцію **Success**

Підготовка екрана: закладки сховати (`Ctrl+Shift+B`), одна вкладка з `/en/market`, масштаб 110%, режим «Не турбувати», телефон із World App під рукою. **Ключі й налаштування Vercel у кадр не потрапляють.**

---

## 2. Сцени (разом ~85 секунд)

### 🎬 1 · Проблема · 0:00–0:10
**Екран:** `/en/market`, видно зелений банер

> "Agents can hire other agents — but every payment still ends with a human and a credit card. Here, agents pay each other with real money, inside hard limits."

*«Агенти можуть наймати інших агентів — але кожен платіж досі закінчується людиною з карткою. Тут агенти платять одне одному справжніми грошима, у жорстких межах.»*

### 🎬 2 · Мала угода, без людини · 0:10–0:40
**Що робити:** увімкни **🔊 Voice**. Встав у поле **Ask in your own words**:
```
Translate into Czech, cheapest provider please: "Good morning, the meeting is at 10."
```
Натисни **Ask the buyer agent** → **Let the provider's agent do the job** → **Ask the judge**. Покажи два зелені посилання на транзакції і клікни одне, щоб відкрився BaseScan.

> "The buyer agent finds the cheapest translator. Two cents is under the limit, so no human is needed: it locks real USDC in escrow on Base Sepolia. The provider agent does the job, the judge agent accepts it, and escrow pays the provider. Two real transactions — here on BaseScan."

*«Агент-покупець знаходить найдешевшого перекладача. Два центи — менше ліміту, тож людина не потрібна: він блокує справжні USDC в ескроу на Base Sepolia. Агент-виконавець робить роботу, агент-суддя її приймає, і ескроу платить виконавцю. Дві справжні транзакції — ось вони на BaseScan.»*

### 🎬 3 · Велика угода, з людиною · 0:40–1:10
**Що робити:** встав
```
Audit this Solidity withdraw() for reentrancy: it sends ETH to msg.sender first, then sets balance[msg.sender] = 0.
```
Покажи причину в **Human gate** («$2 is above the $1 limit…»), зроби Selfie Check (відео прискор), далі виконавець → суддя → ще один Selfie Check → **Paid to provider**.

> "Two dollars is above the limit, so the agent stops and asks me. I approve with a World ID Selfie Check, bound to this exact deal. Only then the money moves. The auditor finds the bug; the amount is big, so the final payout needs me again."

*«Два долари — більше ліміту, тож агент зупиняється і питає мене. Я підтверджую через World ID Selfie Check, прив'язаний саме до цієї угоди. Лише тоді гроші рухаються. Аудитор знаходить помилку; сума велика, тож фінальна виплата знову потребує мене.»*

### 🎬 4 · Безпека і чесність · 1:10–1:25
**Екран:** банер із лімітами, потім `HACKATHON.md` на GitHub

> "Hard caps are in code: five dollars per payment, ten per day. Nothing pays twice. The escrow is an agent wallet, not a smart contract yet — and our base was built before tonight; HACKATHON.md says exactly what is new."

*«Жорсткі ліміти — у коді: п'ять доларів за платіж, десять на день. Ніщо не оплачується двічі. Ескроу — це гаманець агента, а не смарт-контракт, поки що. Основа зроблена до сьогоднішньої ночі; HACKATHON.md точно каже, що нове.»*

---

## 3. Після запису

- [ ] ≤ **90 секунд**
- [ ] Голос чутно; збої не вирізані, лише прискорене очікування
- [ ] У кадрі немає ключів, `.env.local`, налаштувань Vercel
- [ ] У HQ: репозиторій + відео + тема **Agentic Economy** + галочка **Best ElevenLabs Use**, якщо голос був ElevenLabs
- [ ] Подано **до 07:14**

## 4. Запасний план

- **Selfie Check не працює:** покажи сцену 2 повністю, а в сцені 3 чесно скажи, що підтвердження не пройшло через мережу. Не вдавай, що пройшло.
- **Транзакція впала:** на екрані з'явиться помилка і кнопка «Retry the payment». Покажи це: «нічого не оплачується двічі» — теж частина демо.
- **Немає ключів гаманців:** угоди будуть **SIMULATED**. Так і скажи у відео; для цього треку це сильно мінус, тож ключі — пріоритет №1.
