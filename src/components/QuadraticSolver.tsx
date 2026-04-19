import { useState, FormEvent } from 'react';
import { Calculator, RotateCcw, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const QuadraticSolver = () => {
  const [a, setA] = useState<string>('');
  const [b, setB] = useState<string>('');
  const [c, setC] = useState<string>('');
  const [result, setResult] = useState<any>(null);

  const solve = (e: FormEvent) => {
    e.preventDefault();
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    const numC = parseFloat(c);

    if (isNaN(numA) || isNaN(numB) || isNaN(numC)) {
      alert('Vui lòng nhập đầy đủ các hệ số a, b, c');
      return;
    }

    if (numA === 0) {
      // Linear equation bx + c = 0
      if (numB === 0) {
        if (numC === 0) {
          setResult({ type: 'infinite', steps: ['Phương trình có dạng 0 = 0', 'Phương trình có vô số nghiệm.'] });
        } else {
          setResult({ type: 'none', steps: [`Phương trình có dạng ${numC} = 0`, 'Phương trình vô nghiệm.'] });
        }
      } else {
        const x = -numC / numB;
        setResult({
          type: 'linear',
          x,
          steps: [
            `Vì a = 0, phương trình trở thành phương trình bậc nhất: ${numB}x + ${numC} = 0`,
            `${numB}x = ${-numC}`,
            `x = ${-numC} / ${numB}`,
            `x = ${x.toFixed(4)}`
          ]
        });
      }
      return;
    }

    const delta = numB * numB - 4 * numA * numC;
    const steps = [
      `Xác định các hệ số: a = ${numA}, b = ${numB}, c = ${numC}`,
      `Tính biệt thức Delta (Δ) = b² - 4ac`,
      `Δ = (${numB})² - 4 * (${numA}) * (${numC})`,
      `Δ = ${numB * numB} - ${4 * numA * numC}`,
      `Δ = ${delta}`
    ];

    if (delta < 0) {
      steps.push(`Vì Δ < 0 (${delta} < 0), phương trình vô nghiệm trên tập số thực.`);
      setResult({ type: 'no-solution', delta, steps });
    } else if (delta === 0) {
      const x = -numB / (2 * numA);
      steps.push(`Vì Δ = 0, phương trình có nghiệm kép: x₁ = x₂ = -b / (2a)`);
      steps.push(`x = -(${numB}) / (2 * ${numA})`);
      steps.push(`x = ${-numB} / ${2 * numA}`);
      steps.push(`x = ${x.toFixed(4)}`);
      setResult({ type: 'one-solution', delta, x, steps });
    } else {
      const sqrtDelta = Math.sqrt(delta);
      const x1 = (-numB + sqrtDelta) / (2 * numA);
      const x2 = (-numB - sqrtDelta) / (2 * numA);
      steps.push(`Vì Δ > 0 (${delta} > 0), phương trình có hai nghiệm phân biệt:`);
      steps.push(`√Δ = √${delta} = ${sqrtDelta.toFixed(4)}`);
      steps.push(`x₁ = (-b + √Δ) / (2a) = (-(${numB}) + ${sqrtDelta.toFixed(4)}) / (2 * ${numA})`);
      steps.push(`x₁ = ${(-numB + sqrtDelta).toFixed(4)} / ${2 * numA} = ${x1.toFixed(4)}`);
      steps.push(`x₂ = (-b - √Δ) / (2a) = (-(${numB}) - ${sqrtDelta.toFixed(4)}) / (2 * ${numA})`);
      steps.push(`x₂ = ${(-numB - sqrtDelta).toFixed(4)} / ${2 * numA} = ${x2.toFixed(4)}`);
      setResult({ type: 'two-solutions', delta, x1, x2, steps });
    }
  };

  const reset = () => {
    setA('');
    setB('');
    setC('');
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-indigo-600 p-8 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Calculator className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Giải Phương Trình Bậc 2</h1>
          </div>
          <p className="text-indigo-100 opacity-90">
            Dạng tổng quát: <span className="font-mono italic">ax² + bx + c = 0</span>
          </p>
          {(a || b || c) && (
            <div className="mt-4 p-3 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 inline-block">
              <span className="text-sm font-medium">Phương trình: </span>
              <span className="font-mono text-lg font-bold">
                {a || 'a'}x² 
                {b ? (parseFloat(b) >= 0 ? ` + ${b}` : ` - ${Math.abs(parseFloat(b))}`) : ' + b'}x 
                {c ? (parseFloat(c) >= 0 ? ` + ${c}` : ` - ${Math.abs(parseFloat(c))}`) : ' + c'} = 0
              </span>
            </div>
          )}
        </div>

        <div className="p-8">
          <form onSubmit={solve} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Hệ số a</label>
              <input
                type="number"
                step="any"
                value={a}
                onChange={(e) => setA(e.target.value)}
                placeholder="Nhập a..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Hệ số b</label>
              <input
                type="number"
                step="any"
                value={b}
                onChange={(e) => setB(e.target.value)}
                placeholder="Nhập b..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Hệ số c</label>
              <input
                type="number"
                step="any"
                value={c}
                onChange={(e) => setC(e.target.value)}
                placeholder="Nhập c..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                required
              />
            </div>

            <div className="md:col-span-3 flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
              >
                <Calculator className="w-5 h-5" />
                Giải phương trình
              </button>
              <button
                type="button"
                onClick={reset}
                className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Làm mới
              </button>
            </div>
          </form>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
                  <h2 className="text-xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
                    <Info className="w-6 h-6" />
                    Kết quả và các bước giải:
                  </h2>
                  <div className="space-y-4">
                    {result.steps.map((step: string, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex gap-4 items-start p-3 bg-white rounded-lg border border-indigo-50 shadow-sm"
                      >
                        <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md">
                          {index + 1}
                        </span>
                        <p className="text-gray-800 font-medium leading-relaxed">
                          {step}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {result.type === 'two-solutions' && (
                     <>
                        <div className="p-6 bg-green-50 rounded-2xl border border-green-100">
                          <p className="text-green-800 text-sm font-bold uppercase tracking-wider mb-1">Nghiệm x₁</p>
                          <p className="text-3xl font-black text-green-600">{result.x1.toFixed(4)}</p>
                        </div>
                        <div className="p-6 bg-green-50 rounded-2xl border border-green-100">
                          <p className="text-green-800 text-sm font-bold uppercase tracking-wider mb-1">Nghiệm x₂</p>
                          <p className="text-3xl font-black text-green-600">{result.x2.toFixed(4)}</p>
                        </div>
                     </>
                   )}
                   {(result.type === 'one-solution' || result.type === 'linear') && (
                      <div className="md:col-span-2 p-6 bg-green-50 rounded-2xl border border-green-100">
                        <p className="text-green-800 text-sm font-bold uppercase tracking-wider mb-1">Nghiệm x</p>
                        <p className="text-3xl font-black text-green-600">{result.x.toFixed(4)}</p>
                      </div>
                   )}
                   {result.type === 'no-solution' && (
                      <div className="md:col-span-2 p-6 bg-red-50 rounded-2xl border border-red-100 text-center">
                        <p className="text-red-600 text-xl font-bold">Phương trình vô nghiệm</p>
                      </div>
                   )}
                   {result.type === 'infinite' && (
                      <div className="md:col-span-2 p-6 bg-blue-50 rounded-2xl border border-blue-100 text-center">
                        <p className="text-blue-600 text-xl font-bold">Phương trình có vô số nghiệm</p>
                      </div>
                   )}
                   {result.type === 'none' && (
                      <div className="md:col-span-2 p-6 bg-red-50 rounded-2xl border border-red-100 text-center">
                        <p className="text-red-600 text-xl font-bold">Phương trình vô nghiệm</p>
                      </div>
                   )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <footer className="mt-8 text-center text-gray-400 text-sm">
        <p>© 2024 Công cụ Giải Phương Trình Bậc 2</p>
      </footer>
    </div>
  );
};

export default QuadraticSolver;
