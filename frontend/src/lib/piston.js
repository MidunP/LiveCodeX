// Piston API is a service for code execution

const PISTON_API = "https://emkc.org/api/v2/piston";
const TIMEOUT_MS = 12000;

const LANGUAGE_VERSIONS = {
  javascript: { language: "javascript", version: "18.15.0" },
  python: { language: "python", version: "3.10.0" },
  java: { language: "java", version: "15.0.2" },
};

/**
 * @param {string} language - programming language
 * @param {string} code - source code to execute
 * @returns {Promise<{success:boolean, output?:string, error?: string}>}
 */
export async function executeCode(language, code) {
  if (!code || !code.trim()) {
    return {
      success: false,
      error: "No code to run. Write some code first.",
    };
  }

  try {
    const languageConfig = LANGUAGE_VERSIONS[language];

    if (!languageConfig) {
      return {
        success: false,
        error: `Unsupported language: ${language}`,
      };
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    let response;
    try {
      response = await fetch(`${PISTON_API}/execute`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: languageConfig.language,
          version: languageConfig.version,
          files: [
            {
              name: `main.${getFileExtension(language)}`,
              content: code,
            },
          ],
        }),
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeoutId);
    }

    if (!response.ok) {
      return {
        success: false,
        error: `Code execution service returned an error (status ${response.status}). Please try again.`,
      };
    }

    const data = await response.json();

    // Guard against unexpected API response shape
    if (!data || !data.run) {
      return {
        success: false,
        error: "Unexpected response from code execution service. Please try again.",
      };
    }

    const output = data.run.stdout || data.run.output || "";
    const stderr = data.run.stderr || "";

    if (stderr && stderr.trim()) {
      return {
        success: false,
        output: output || undefined,
        error: stderr,
      };
    }

    return {
      success: true,
      output: output.trim() || "Code ran successfully with no output.",
    };
  } catch (error) {
    if (error.name === "AbortError") {
      return {
        success: false,
        error: "Code execution timed out after 12 seconds. Try simplifying your code.",
      };
    }
    return {
      success: false,
      error: `Failed to execute code: ${error.message}`,
    };
  }
}

function getFileExtension(language) {
  const extensions = {
    javascript: "js",
    python: "py",
    java: "java",
  };

  return extensions[language] || "txt";
}
