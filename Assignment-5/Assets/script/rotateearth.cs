using UnityEngine;

public class RotateEarth : MonoBehaviour
{
    void Update()
    {
        transform.Rotate(0, 30 * Time.deltaTime, 0);
    }
}